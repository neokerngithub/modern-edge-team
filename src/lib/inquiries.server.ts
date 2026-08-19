/**
 * Server-only persistence for every inquiry submitted through the site.
 *
 * The `inquiries` table has row level security enabled with no policies, so it
 * is unreachable from the browser. Writes happen here with the service role.
 */

export type InquiryKind = "contact" | "valuation" | "construction";

export type InquiryRecord = {
  kind: InquiryKind;
  reference: string;
  fullName: string;
  phone: string;
  email: string;
  service?: string | null;
  message?: string | null;
  details?: Record<string, unknown>;
};

export async function saveInquiry(record: InquiryRecord): Promise<void> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { error } = await supabaseAdmin.from("inquiries").insert({
    kind: record.kind,
    reference: record.reference,
    full_name: record.fullName,
    phone: record.phone,
    email: record.email,
    service: record.service ?? null,
    message: record.message ?? null,
    details: JSON.parse(JSON.stringify(record.details ?? {})),
  });

  if (error) {
    console.error("[inquiry-persist-failed]", { kind: record.kind, message: error.message });
    throw new Error("We could not record your request. Please try again or email us directly.");
  }
}

export function buildReference(prefix: "PV" | "CN" | "GC"): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ME-${prefix}-${stamp}-${rand}`;
}

/**
 * Sends an internal notification about a new inquiry to the company inboxes.
 *
 * Delivery uses Lovable's managed email API, which requires a verified sender
 * domain. Until that domain is verified the send fails softly: the inquiry is
 * already persisted, so a notification problem must never break a submission.
 */
export async function notifyInternal(payload: {
  subject: string;
  lines: string[];
}): Promise<void> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  const senderDomain = process.env["EMAIL_SENDER_DOMAIN"];

  if (!apiKey || !senderDomain) {
    console.info("[inquiry-notify-skipped]", { subject: payload.subject });
    return;
  }

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7">${payload.lines
    .map((line) => `<p style="margin:0 0 6px">${line}</p>`)
    .join("")}</div>`;

  try {
    const response = await fetch("https://email.lovable.dev/v1/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Modern Edge Website <notifications@${senderDomain}>`,
        to: ["meae.np@gmail.com", "info@modernedge.com.np"],
        subject: payload.subject,
        html,
        text: payload.lines.join("\n"),
      }),
    });

    if (!response.ok) {
      console.error(`[inquiry-notify-failed] ${response.status}: ${await response.text()}`);
    }
  } catch (error) {
    console.error("[inquiry-notify-failed]", error);
  }
}

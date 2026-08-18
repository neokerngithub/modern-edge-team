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
    details: record.details ?? {},
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

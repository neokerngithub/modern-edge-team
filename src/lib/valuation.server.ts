import {
  ATTACHMENT_TYPES,
  MAX_ATTACHMENT_BYTES,
  valuationRequestSchema,
  type ValuationRequestInput,
} from "./valuation-schema";

export type ValuationSubmissionResult = {
  reference: string;
  receivedAt: string;
};

function reference(): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ME-PV-${stamp}-${rand}`;
}

/**
 * Server-side handling of a valuation request.
 *
 * Persistence (database row + attachment in storage + notification email) is
 * added in the next phase once Lovable Cloud is enabled for this project.
 * Until then the request is validated and recorded in the server log so no
 * submission is silently faked in the browser.
 */
export async function handleValuationRequest(form: FormData): Promise<ValuationSubmissionResult> {
  const file = form.get("attachment");
  const attachment = file instanceof File && file.size > 0 ? file : null;

  if (attachment) {
    if (attachment.size > MAX_ATTACHMENT_BYTES) {
      throw new Error("Attachment is larger than 10 MB. Please upload a smaller file.");
    }
    if (!ATTACHMENT_TYPES.includes(attachment.type as (typeof ATTACHMENT_TYPES)[number])) {
      throw new Error("Attachment must be a PDF, JPG, PNG or WEBP file.");
    }
  }

  const raw: Record<string, unknown> = {};
  for (const key of [
    "fullName",
    "phone",
    "email",
    "propertyType",
    "propertyLocation",
    "municipality",
    "landArea",
    "buildingArea",
    "purpose",
    "contactMethod",
    "notes",
  ]) {
    const value = form.get(key);
    raw[key] = typeof value === "string" ? value : "";
  }

  if (attachment) {
    raw.attachmentName = attachment.name;
    raw.attachmentSize = attachment.size;
    raw.attachmentType = attachment.type;
  }

  const parsed = valuationRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new Error(first?.message ?? "Some details are missing or invalid.");
  }

  const data: ValuationRequestInput = parsed.data;
  const result: ValuationSubmissionResult = {
    reference: reference(),
    receivedAt: new Date().toISOString(),
  };

  console.info("[valuation-request]", {
    reference: result.reference,
    propertyType: data.propertyType,
    purpose: data.purpose,
    municipality: data.municipality,
    hasAttachment: Boolean(attachment),
  });

  return result;
}

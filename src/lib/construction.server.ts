import {
  ATTACHMENT_TYPES,
  CONSTRUCTION_TEXT_FIELDS,
  MAX_ATTACHMENT_BYTES,
  constructionInquirySchema,
  type ConstructionInquiryInput,
} from "./construction-schema";

export type ConstructionSubmissionResult = {
  reference: string;
  receivedAt: string;
};

function reference(): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ME-CN-${stamp}-${rand}`;
}

/**
 * Server-side handling of a construction inquiry.
 *
 * Persistence (database row + attachment in storage + notification email) is
 * added once Lovable Cloud is enabled. Until then the inquiry is validated on
 * the server and recorded in the server log, so nothing is faked in-browser.
 */
export async function handleConstructionInquiry(
  form: FormData,
): Promise<ConstructionSubmissionResult> {
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
  for (const key of CONSTRUCTION_TEXT_FIELDS) {
    const value = form.get(key);
    raw[key] = typeof value === "string" ? value : "";
  }

  if (attachment) {
    raw["attachmentName"] = attachment.name;
    raw["attachmentSize"] = attachment.size;
    raw["attachmentType"] = attachment.type;
  }

  const parsed = constructionInquirySchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new Error(first?.message ?? "Some details are missing or invalid.");
  }

  const data: ConstructionInquiryInput = parsed.data;
  const result: ConstructionSubmissionResult = {
    reference: reference(),
    receivedAt: new Date().toISOString(),
  };

  console.info("[construction-inquiry]", {
    reference: result.reference,
    projectType: data.projectType,
    currentStage: data.currentStage,
    requiredService: data.requiredService,
    hasAttachment: Boolean(attachment),
  });

  return result;
}

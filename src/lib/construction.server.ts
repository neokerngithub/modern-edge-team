import { buildReference, notifyInternal, saveInquiry } from "./inquiries.server";
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

/**
 * Server-side handling of a construction inquiry.
 *
 * The inquiry is validated, stored in the database and an internal
 * notification email is attempted. Attachment metadata is recorded; the file
 * itself is not stored.
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
    reference: buildReference("CN"),
    receivedAt: new Date().toISOString(),
  };

  await saveInquiry({
    kind: "construction",
    reference: result.reference,
    fullName: data.name,
    phone: data.phone,
    email: data.email,
    service: "Construction",
    message: data.message ?? null,
    details: {
      ...data,
      attachment: attachment
        ? { name: attachment.name, size: attachment.size, type: attachment.type }
        : null,
    },
  });

  await notifyInternal({
    subject: `Construction inquiry ${result.reference}`,
    lines: [
      `Reference: ${result.reference}`,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Project type: ${data.projectType}`,
      `Current stage: ${data.currentStage}`,
      `Required service: ${data.requiredService}`,
    ],
  });

  return result;
}

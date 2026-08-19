import { buildReference, notifyInternal, saveInquiry } from "./inquiries.server";
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

/**
 * Server-side handling of a valuation request.
 *
 * The request is validated, stored in the database and an internal
 * notification email is attempted. Attachment metadata is recorded; the file
 * itself is not stored.
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
    raw["attachmentName"] = attachment.name;
    raw["attachmentSize"] = attachment.size;
    raw["attachmentType"] = attachment.type;
  }

  const parsed = valuationRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new Error(first?.message ?? "Some details are missing or invalid.");
  }

  const data: ValuationRequestInput = parsed.data;
  const result: ValuationSubmissionResult = {
    reference: buildReference("PV"),
    receivedAt: new Date().toISOString(),
  };

  await saveInquiry({
    kind: "valuation",
    reference: result.reference,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    service: "Property Valuation",
    message: data.notes ?? null,
    details: {
      propertyType: data.propertyType,
      propertyLocation: data.propertyLocation,
      municipality: data.municipality,
      landArea: data.landArea,
      buildingArea: data.buildingArea,
      purpose: data.purpose,
      contactMethod: data.contactMethod,
      attachment: attachment
        ? { name: attachment.name, size: attachment.size, type: attachment.type }
        : null,
    },
  });

  await notifyInternal({
    subject: `Valuation request ${result.reference}`,
    lines: [
      `Reference: ${result.reference}`,
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Property type: ${data.propertyType}`,
      `Location: ${data.propertyLocation}, ${data.municipality}`,
      `Purpose: ${data.purpose}`,
      `Preferred contact: ${data.contactMethod}`,
      `Notes: ${data.notes ?? "-"}`,
    ],
  });

  return result;
}

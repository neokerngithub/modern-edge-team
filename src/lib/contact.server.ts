import { CONTACT_TEXT_FIELDS, contactInquirySchema } from "./contact-schema";
import { buildReference, notifyInternal, saveInquiry } from "./inquiries.server";

export type ContactSubmissionResult = {
  reference: string;
  receivedAt: string;
};

export async function handleContactInquiry(form: FormData): Promise<ContactSubmissionResult> {
  // Spam protection: hidden honeypot field + minimum time on form.
  const honeypot = form.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    throw new Error("Your message could not be sent. Please try again.");
  }

  const elapsed = Number(form.get("elapsed") ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < 2000) {
    throw new Error("Please take a moment to complete the form, then submit again.");
  }

  const raw: Record<string, unknown> = {};
  for (const key of CONTACT_TEXT_FIELDS) {
    const value = form.get(key);
    raw[key] = typeof value === "string" ? value : "";
  }

  const parsed = contactInquirySchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new Error(first?.message ?? "Some details are missing or invalid.");
  }

  const data = parsed.data;
  const reference = buildReference("GC");

  await saveInquiry({
    kind: "contact",
    reference,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    service: data.service,
    message: data.message,
    details: { source: "contact-page" },
  });

  await notifyInternal({
    subject: `Website inquiry ${reference}`,
    lines: [
      `Reference: ${reference}`,
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Service: ${data.service}`,
      `Message: ${data.message}`,
    ],
  });

  return { reference, receivedAt: new Date().toISOString() };
}

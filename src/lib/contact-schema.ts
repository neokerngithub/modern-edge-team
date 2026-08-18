import { z } from "zod";

export const CONTACT_SERVICES = [
  "Property Valuation",
  "Construction",
  "Architecture",
  "Civil Engineering",
  "Interior Design",
  "Landscape Design",
  "Municipal Drawings",
  "DPR",
  "Real Estate",
  "CAD 2D/3D Course",
  "Other",
] as const;

export const contactInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone number may only contain digits and + - ( )"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  service: z.enum(CONTACT_SERVICES, { message: "Select the service you are interested in" }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about what you are planning")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInquiryInput, string>>;

export const CONTACT_TEXT_FIELDS = [
  "fullName",
  "phone",
  "email",
  "service",
  "message",
] as const;

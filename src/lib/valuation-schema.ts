import { z } from "zod";

export const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Land",
  "Apartment",
  "Other",
] as const;

export const PURPOSES = [
  "Bank / Financing",
  "Sale / Purchase",
  "Internal Assessment",
  "Legal / Documentation",
  "Other",
] as const;

export const CONTACT_METHODS = ["Phone Call", "WhatsApp / Viber", "Email"] as const;

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const valuationRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone number may only contain digits and + - ( )"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  propertyType: z.enum(PROPERTY_TYPES, { message: "Select a property type" }),
  propertyLocation: z.string().trim().min(3, "Please enter the property location").max(200),
  municipality: z.string().trim().min(2, "Please enter the municipality / local level").max(150),
  landArea: z.string().trim().max(80).optional().or(z.literal("")),
  buildingArea: z.string().trim().max(80).optional().or(z.literal("")),
  purpose: z.enum(PURPOSES, { message: "Select the purpose of valuation" }),
  contactMethod: z.enum(CONTACT_METHODS, { message: "Select a preferred contact method" }),
  notes: z.string().trim().max(1500, "Please keep this under 1500 characters").optional().or(z.literal("")),
  attachmentName: z.string().trim().max(255).optional(),
  attachmentSize: z.number().int().nonnegative().max(MAX_ATTACHMENT_BYTES).optional(),
  attachmentType: z.string().trim().max(120).optional(),
});

export type ValuationRequestInput = z.infer<typeof valuationRequestSchema>;

export type ValuationFieldErrors = Partial<Record<keyof ValuationRequestInput | "attachment", string>>;

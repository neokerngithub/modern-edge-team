import { z } from "zod";

export const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Interior",
  "Renovation",
  "Other",
] as const;

export const CURRENT_STAGES = [
  "Planning",
  "Design",
  "Estimation",
  "Construction",
  "Finishing",
  "Other",
] as const;

export const REQUIRED_SERVICES = [
  "Complete Construction",
  "Design + Construction",
  "Construction Management",
  "Interior",
  "Renovation",
  "Consultation",
] as const;

export const BUDGET_RANGES = [
  "Not decided yet",
  "Under NPR 50 Lakh",
  "NPR 50 Lakh – 1 Crore",
  "NPR 1 – 3 Crore",
  "NPR 3 – 10 Crore",
  "Above NPR 10 Crore",
] as const;

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const constructionInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Phone number may only contain digits and + - ( )"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  projectLocation: z.string().trim().min(3, "Please enter the project location").max(200),
  projectType: z.enum(PROJECT_TYPES, { message: "Select a project type" }),
  area: z.string().trim().max(80).optional().or(z.literal("")),
  currentStage: z.enum(CURRENT_STAGES, { message: "Select the current stage" }),
  requiredService: z.enum(REQUIRED_SERVICES, { message: "Select the service you need" }),
  budgetRange: z.enum(BUDGET_RANGES, { message: "Select a budget range" }),
  message: z
    .string()
    .trim()
    .max(1500, "Please keep this under 1500 characters")
    .optional()
    .or(z.literal("")),
  attachmentName: z.string().trim().max(255).optional(),
  attachmentSize: z.number().int().nonnegative().max(MAX_ATTACHMENT_BYTES).optional(),
  attachmentType: z.string().trim().max(120).optional(),
});

export type ConstructionInquiryInput = z.infer<typeof constructionInquirySchema>;

export type ConstructionFieldErrors = Partial<
  Record<keyof ConstructionInquiryInput | "attachment", string>
>;

export const CONSTRUCTION_TEXT_FIELDS = [
  "name",
  "phone",
  "email",
  "projectLocation",
  "projectType",
  "area",
  "currentStage",
  "requiredService",
  "budgetRange",
  "message",
] as const;

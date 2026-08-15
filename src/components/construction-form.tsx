import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitConstructionInquiry } from "@/lib/construction.functions";
import {
  ATTACHMENT_TYPES,
  BUDGET_RANGES,
  CONSTRUCTION_TEXT_FIELDS,
  CURRENT_STAGES,
  MAX_ATTACHMENT_BYTES,
  PROJECT_TYPES,
  REQUIRED_SERVICES,
  constructionInquirySchema,
  type ConstructionFieldErrors,
} from "@/lib/construction-schema";

const fieldClass =
  "h-12 w-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";
const labelClass = "block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground";

function Field({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={htmlFor}>
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {error ? (
        <p className="mt-2 text-[0.7rem] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  placeholder,
  options,
}: {
  id: string;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <select id={id} name={id} defaultValue="" className={fieldClass}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function ConstructionForm() {
  const submit = useServerFn(submitConstructionInquiry);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ConstructionFieldErrors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = Object.fromEntries(
      CONSTRUCTION_TEXT_FIELDS.map((key) => [key, String(data.get(key) ?? "")]),
    );

    const parsed = constructionInquirySchema.safeParse(values);
    const nextErrors: ConstructionFieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ConstructionFieldErrors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
    }

    const file = data.get("attachment");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        nextErrors.attachment = "File must be smaller than 10 MB.";
      } else if (!ATTACHMENT_TYPES.includes(file.type as (typeof ATTACHMENT_TYPES)[number])) {
        nextErrors.attachment = "Use a PDF, JPG, PNG or WEBP file.";
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please correct the highlighted fields and submit again.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const result = await submit({ data });
      setReference(result.reference);
      setStatus("success");
      form.reset();
      setFileName("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "We couldn't send your inquiry. Please try again or call our office.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hairline bg-background p-8 md:p-14">
        <p className="eyebrow text-primary">Inquiry received</p>
        <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] md:text-4xl">
          Your project inquiry has been submitted.
        </h3>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Our team will review the details and get in touch to discuss the requirement, the site and
          the next stage of work.
        </p>
        <dl className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          <div className="bg-background p-6">
            <dt className="eyebrow">Reference</dt>
            <dd className="mt-3 text-lg font-bold tracking-tight">{reference}</dd>
          </div>
          <div className="bg-background p-6">
            <dt className="eyebrow">Next step</dt>
            <dd className="mt-3 text-sm text-muted-foreground">Consultation</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReference("");
          }}
          className="link-underline mt-10 text-[0.72rem] font-bold tracking-[0.18em] uppercase"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={onSubmit} noValidate className="border border-hairline bg-background p-6 md:p-12">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input id="name" name="name" className={fieldClass} placeholder="Your full name" autoComplete="name" />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone}>
          <input id="phone" name="phone" className={fieldClass} placeholder="+977 ..." autoComplete="tel" inputMode="tel" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" className={fieldClass} placeholder="you@example.com" autoComplete="email" inputMode="email" />
        </Field>
        <Field label="Project Location" htmlFor="projectLocation" error={errors.projectLocation}>
          <input id="projectLocation" name="projectLocation" className={fieldClass} placeholder="Area, district" />
        </Field>
        <Field label="Project Type" htmlFor="projectType" error={errors.projectType}>
          <Select id="projectType" placeholder="Select project type" options={PROJECT_TYPES} />
        </Field>
        <Field label="Approximate Area" htmlFor="area" error={errors.area}>
          <input id="area" name="area" className={fieldClass} placeholder="e.g. 2,400 sq.ft (optional)" />
        </Field>
        <Field label="Current Stage" htmlFor="currentStage" error={errors.currentStage}>
          <Select id="currentStage" placeholder="Select current stage" options={CURRENT_STAGES} />
        </Field>
        <Field label="Required Service" htmlFor="requiredService" error={errors.requiredService}>
          <Select id="requiredService" placeholder="Select required service" options={REQUIRED_SERVICES} />
        </Field>
        <Field label="Budget Range" htmlFor="budgetRange" error={errors.budgetRange}>
          <Select id="budgetRange" placeholder="Select budget range" options={BUDGET_RANGES} />
        </Field>
        <Field label="Message" htmlFor="message" error={errors.message} className="md:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            placeholder="Tell us about the project, the site and the timeline you have in mind."
          />
        </Field>
        <Field label="Attachment" htmlFor="attachment" error={errors.attachment} className="md:col-span-2">
          <label
            htmlFor="attachment"
            className="flex cursor-pointer flex-wrap items-center justify-between gap-4 border border-dashed border-input px-4 py-5 transition-colors hover:border-primary"
          >
            <span className="text-sm text-muted-foreground">
              {fileName || "Attach drawings, site photos or reference documents"}
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-primary">
              Choose file
            </span>
          </label>
          <input
            id="attachment"
            name="attachment"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          <p className="mt-2 text-[0.7rem] text-muted-foreground">PDF, JPG, PNG or WEBP · up to 10 MB</p>
        </Field>
      </div>

      {status === "error" && message ? (
        <p className="mt-8 border border-destructive/40 px-4 py-3 text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-hairline pt-8">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-13 min-w-[220px] items-center justify-center gap-3 border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-primary disabled:hover:text-primary-foreground"
        >
          {loading ? (
            <>
              <span className="h-3 w-3 animate-spin border border-current border-t-transparent" aria-hidden="true" />
              Sending
            </>
          ) : (
            "Submit Project Inquiry"
          )}
        </button>
        <p className="max-w-xs text-[0.7rem] leading-relaxed text-muted-foreground">
          Your details are used only to discuss this project with you.
        </p>
      </div>
    </form>
  );
}

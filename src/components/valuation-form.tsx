import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitValuationRequest } from "@/lib/valuation.functions";
import {
  ATTACHMENT_TYPES,
  CONTACT_METHODS,
  MAX_ATTACHMENT_BYTES,
  PROPERTY_TYPES,
  PURPOSES,
  valuationRequestSchema,
  type ValuationFieldErrors,
} from "@/lib/valuation-schema";

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
  error?: string;
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

export function ValuationForm() {
  const submit = useServerFn(submitValuationRequest);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ValuationFieldErrors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values = Object.fromEntries(
      [
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
      ].map((key) => [key, String(data.get(key) ?? "")]),
    );

    const parsed = valuationRequestSchema.safeParse(values);
    const nextErrors: ValuationFieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ValuationFieldErrors;
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
          : "We couldn't send your request. Please try again or call our office.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hairline bg-background p-8 md:p-14">
        <p className="eyebrow text-primary">Request received</p>
        <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] md:text-4xl">
          Your valuation request has been submitted.
        </h3>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Our team will review the details and contact you using your preferred contact method to
          confirm the assignment and the documents required.
        </p>
        <dl className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          <div className="bg-background p-6">
            <dt className="eyebrow">Reference</dt>
            <dd className="mt-3 text-lg font-bold tracking-tight">{reference}</dd>
          </div>
          <div className="bg-background p-6">
            <dt className="eyebrow">Next step</dt>
            <dd className="mt-3 text-sm text-muted-foreground">Assignment confirmation</dd>
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
          Submit another request
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-hairline bg-background p-6 md:p-12"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
          <input id="fullName" name="fullName" className={fieldClass} placeholder="Your full name" autoComplete="name" />
        </Field>
        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <input id="phone" name="phone" className={fieldClass} placeholder="+977 ..." autoComplete="tel" inputMode="tel" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" name="email" className={fieldClass} placeholder="you@example.com" autoComplete="email" inputMode="email" />
        </Field>
        <Field label="Property Type" htmlFor="propertyType" error={errors.propertyType}>
          <select id="propertyType" name="propertyType" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select property type
            </option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Property Location" htmlFor="propertyLocation" error={errors.propertyLocation}>
          <input id="propertyLocation" name="propertyLocation" className={fieldClass} placeholder="Area, district" />
        </Field>
        <Field label="Municipality / Local Level" htmlFor="municipality" error={errors.municipality}>
          <input id="municipality" name="municipality" className={fieldClass} placeholder="Municipality / ward" />
        </Field>
        <Field label="Approximate Land Area" htmlFor="landArea" error={errors.landArea}>
          <input id="landArea" name="landArea" className={fieldClass} placeholder="e.g. 4 aana / 320 sq.m" />
        </Field>
        <Field label="Building Area" htmlFor="buildingArea" error={errors.buildingArea}>
          <input id="buildingArea" name="buildingArea" className={fieldClass} placeholder="e.g. 1,800 sq.ft (optional)" />
        </Field>
        <Field label="Purpose of Valuation" htmlFor="purpose" error={errors.purpose}>
          <select id="purpose" name="purpose" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select purpose
            </option>
            {PURPOSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Contact Method" htmlFor="contactMethod" error={errors.contactMethod}>
          <select id="contactMethod" name="contactMethod" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select contact method
            </option>
            {CONTACT_METHODS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Additional Information"
          htmlFor="notes"
          error={errors.notes}
          className="md:col-span-2"
        >
          <textarea
            id="notes"
            name="notes"
            rows={5}
            className="w-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            placeholder="Anything relevant about the property, documents or timeline."
          />
        </Field>
        <Field label="Attachment" htmlFor="attachment" error={errors.attachment} className="md:col-span-2">
          <label
            htmlFor="attachment"
            className="flex cursor-pointer flex-wrap items-center justify-between gap-4 border border-dashed border-input px-4 py-5 transition-colors hover:border-primary"
          >
            <span className="text-sm text-muted-foreground">
              {fileName || "Attach ownership papers, drawings or photos"}
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
            "Submit Valuation Request"
          )}
        </button>
        <p className="max-w-xs text-[0.7rem] leading-relaxed text-muted-foreground">
          Your details are used only to prepare and discuss this valuation assignment.
        </p>
      </div>
    </form>
  );
}

import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContactInquiry } from "@/lib/contact.functions";
import {
  CONTACT_SERVICES,
  contactInquirySchema,
  type ContactFieldErrors,
} from "@/lib/contact-schema";

const fieldClass =
  "h-12 w-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";
const labelClass =
  "block text-[0.65rem] font-bold tracking-[0.2em] uppercase text-muted-foreground";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
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

export function ContactForm() {
  const submit = useServerFn(submitContactInquiry);
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef<number>(Date.now());

  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [reference, setReference] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const parsed = contactInquirySchema.safeParse({
      fullName: String(data.get("fullName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
    });

    if (!parsed.success) {
      const next: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus("sending");
    setMessage("");

    data.set("elapsed", String(Date.now() - mountedAt.current));

    try {
      const result = await submit({ data });
      setReference(result.reference);
      setStatus("sent");
      form.reset();
      mountedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email us directly.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-primary p-10">
        <p className="eyebrow text-primary">Inquiry received</p>
        <h3 className="mt-6 text-2xl leading-tight font-extrabold tracking-[-0.02em] md:text-3xl">
          Thank you. Your inquiry has been recorded.
        </h3>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Our team reviews every inquiry and will respond within one working day. Please keep your
          reference number for follow-up.
        </p>
        <p className="mt-8 border border-hairline px-5 py-4 font-mono text-sm tracking-[0.08em]">
          {reference}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReference("");
          }}
          className="mt-8 inline-flex items-center border border-border px-6 py-3 text-[0.68rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-hairline p-8 md:p-10">
      <p className="eyebrow">General inquiry</p>
      <h3 className="mt-5 text-2xl leading-tight font-extrabold tracking-[-0.02em]">
        Tell us what you're planning.
      </h3>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <Field label="Name" htmlFor="fullName" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={100}
            className={fieldClass}
            placeholder="Full name"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={20}
            className={fieldClass}
            placeholder="+977-98XXXXXXXX"
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Service interested in" htmlFor="service" error={errors.service}>
          <select id="service" name="service" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a service
            </option>
            {CONTACT_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8">
        <Field label="Message" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            className="w-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            placeholder="Site location, scope, timeline, anything relevant."
          />
        </Field>
      </div>

      {/* Honeypot — hidden from users, filled by bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && message ? (
        <p className="mt-8 border border-destructive px-5 py-4 text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-10 inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}

"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { MP, REGIONS } from "@/constant";


function TricolorMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-3 w-6 overflow-hidden rounded-[2px] ${className}`}>
      <span className="h-full w-1/3 bg-assembly-green" />
      <span className="h-full w-1/3 bg-assembly-red" />
      <span className="h-full w-1/3 bg-assembly-gold" />
    </span>
  );
}

type Option = { id: string; name: string };

const TOPICS = [
  "Community & development",
  "Public services & infrastructure",
  "Bills & legislation",
  "Governance & accountability",
  "Youth & women's concerns",
  "Education & healthcare",
  "Other public matters",
];


const fieldBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-[clamp(0.88rem,0.84rem+0.2vw,0.975rem)] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-assembly-green";

function FieldShell({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.06em]"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-assembly-red"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${fieldBase} ${error ? "border-assembly-red/60" : "border-ink/15"}`}
      />
    </FieldShell>
  );
}

function TextareaField({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        name={id}
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${fieldBase} resize-none ${error ? "border-assembly-red/60" : "border-ink/15"}`}
      />
    </FieldShell>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  value,
  error,
  options,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  options: Option[];
  disabled?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`${fieldBase} appearance-none pr-10 ${error ? "border-assembly-red/60" : "border-ink/15"} ${
            disabled ? "cursor-not-allowed bg-paper-alt text-ink/35" : "cursor-pointer"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${
            disabled ? "text-ink/25" : "text-ink/50"
          }`}
        >
          <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}


type FormState = {
  regionId: string;
  divisionId: string;
  constituencyId: string;
  mpId: string;
  subject: string;
  message: string;
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormState = {
  regionId: "",
  divisionId: "",
  constituencyId: "",
  mpId: "",
  subject: "",
  message: "",
  email: "",
  phone: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.regionId) errors.regionId = "Select your region.";
  if (!form.divisionId) errors.divisionId = "Select your division.";
  if (!form.constituencyId) errors.constituencyId = "Select your constituency.";
  
  if (!form.subject.trim()) errors.subject = "Add a subject.";
  if (!form.message.trim()) errors.message = "Write your message.";
  if (!form.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (!/^[+\d][\d\s]{6,}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}


export default function WriteToMpPage() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const region = useMemo(() => REGIONS.find((r) => r.id === form.regionId), [form.regionId]);
  const division = useMemo(
    () => region?.divisions.find((d) => d.id === form.divisionId),
    [region, form.divisionId]
  );
  const constituency = useMemo(
    () => division?.constituencies.find((c) => c.id === form.constituencyId),
    [division, form.constituencyId]
  );

  const divisionOptions: Option[] = (region?.divisions ?? []).map((d) => ({
    id: d.id,
    name: d.seats > 1 ? `${d.name} (${d.seats} seats)` : d.name,
  }));
  const constituencyOptions: Option[] = (division?.constituencies ?? []).map((c) => ({
    id: c.id,
    name: c.seats > 1 ? `${c.name} (${c.seats} seats)` : c.name,
  }));
  const mps: MP[] = constituency?.mps ?? [];
  const mpOptions: Option[] = mps;
  const mpDirectoryAvailable = mps.length > 0;

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "regionId") {
        next.divisionId = "";
        next.constituencyId = "";
        next.mpId = "";
      }
      if (key === "divisionId") {
        next.constituencyId = "";
        next.mpId = "";
      }
      if (key === "constituencyId") {
        next.mpId = "";
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/write-to-mp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regionId: form.regionId,
          regionName: region?.name ?? "",
          divisionId: form.divisionId,
          divisionName: division?.name ?? "",
          constituencyId: form.constituencyId,
          constituencyName: constituency?.name ?? "",
          mpId: form.mpId || undefined,
          mpName: mps.find((m) => m.id === form.mpId)?.name,
          subject: form.subject,
          message: form.message,
          email: form.email,
          phone: form.phone,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  const fieldContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06, delayChildren: 0.1 },
    },
  };
  const fieldItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <main className="relative overflow-hidden bg-paper lg:pt-20 md:pt-25 pt-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-assembly-gold/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-assembly-green/10 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 md:py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] md:gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:sticky md:top-16 md:self-start"
          >
            <div className="flex items-center gap-3">
              <TricolorMark />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em]  sm:text-xs">
                Write to Parliament
              </span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(2rem,1.5rem+2.4vw,3rem)] font-medium leading-[1.06] tracking-tight  sm:mt-6">
              Write to your MP
            </h1>

            <p className="mt-5 max-w-prose text-[clamp(0.95rem,0.9rem+0.3vw,1rem)] leading-relaxed text-ink/75 sm:mt-6">
              Select your constituency, find your MP, and make your voice
              heard. You may write about community concerns and development
              priorities, public services and infrastructure, bills and
              proposed legislation, governance and accountability, youth and
              women&apos;s concerns, education and healthcare, or other
              issues of public interest.
            </p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={fieldContainer}
              className="mt-7 flex flex-wrap gap-2 sm:mt-8"
            >
              {TOPICS.map((topic) => (
                <motion.li
                  key={topic}
                  variants={fieldItem}
                  className="rounded-full border border-ink/10 bg-paper-alt px-3.5 py-1.5 text-[0.78rem] text-ink/70 sm:text-sm"
                >
                  {topic}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="rounded-2xl border border-ink/10 bg-white/90 p-5 shadow-[0_1px_2px_rgba(28,35,33,0.04),0_16px_40px_-24px_rgba(28,35,33,0.25)] sm:p-7 md:rounded-3xl md:p-9"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[420px] flex-col items-start justify-center py-10"
                >
                  <TricolorMark className="mb-4" />
                  <h2 className="font-display text-[clamp(1.4rem,1.2rem+1vw,2rem)] font-medium ">
                    Message sent to your MP
                  </h2>
                  <p className="mt-3 max-w-sm text-[clamp(0.9rem,0.86rem+0.2vw,1rem)] leading-relaxed text-ink/70">
                    Thank you for writing in. Your representative&apos;s
                    office will review your message and follow up where
                    appropriate.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-assembly-green underline underline-offset-4 hover:text-assembly-green/80"
                  >
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <h2 className="font-display text-[clamp(1.15rem,1.02rem+0.6vw,1.4rem)] font-medium">
                    Send a message to your MP
                  </h2>

                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fieldContainer}
                    className="mt-6 flex flex-col gap-4 sm:gap-5"
                  >
                    <motion.div variants={fieldItem} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <SelectField
                        id="region"
                        label="Region"
                        placeholder="Choose your region"
                        value={form.regionId}
                        error={errors.regionId}
                        options={REGIONS}
                        onChange={(v) => update("regionId", v)}
                      />
                      <SelectField
                        id="division"
                        label="Division"
                        placeholder="Choose your division"
                        value={form.divisionId}
                        error={errors.divisionId}
                        options={divisionOptions}
                        disabled={!form.regionId}
                        onChange={(v) => update("divisionId", v)}
                      />
                    </motion.div>

                    <motion.div variants={fieldItem} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <SelectField
                        id="constituency"
                        label="Constituency"
                        placeholder="Choose your constituency"
                        value={form.constituencyId}
                        error={errors.constituencyId}
                        options={constituencyOptions}
                        disabled={!form.divisionId}
                        onChange={(v) => update("constituencyId", v)}
                      />
                      <SelectField
                        id="mp"
                        label="Your MP (optional)"
                        placeholder={
                          !form.constituencyId
                            ? "Select your Member of Parliament"
                            : mpDirectoryAvailable
                            ? "Select your Member of Parliament"
                            : "MP directory coming soon"
                        }
                        value={form.mpId}
                        error={errors.mpId}
                        options={mpOptions}
                        disabled={!form.constituencyId || !mpDirectoryAvailable}
                        onChange={(v) => update("mpId", v)}
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <TextField
                        id="subject"
                        label="Subject"
                        placeholder="What is your message about?"
                        value={form.subject}
                        error={errors.subject}
                        onChange={(v) => update("subject", v)}
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <TextareaField
                        id="message"
                        label="Your message"
                        placeholder="Write your message here..."
                        value={form.message}
                        error={errors.message}
                        onChange={(v) => update("message", v)}
                      />
                    </motion.div>

                    <motion.div variants={fieldItem} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <TextField
                        id="email"
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        error={errors.email}
                        onChange={(v) => update("email", v)}
                      />
                      <TextField
                        id="phone"
                        label="Phone number"
                        type="tel"
                        placeholder="+237 6xx xxx xxx"
                        value={form.phone}
                        error={errors.phone}
                        onChange={(v) => update("phone", v)}
                      />
                    </motion.div>

                    {status === "error" && (
                      <p role="alert" className="text-sm text-assembly-red">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <motion.div variants={fieldItem}>
                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
                        whileTap={{ scale: status === "submitting" ? 1 : 0.985 }}
                        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-[clamp(0.9rem,0.86rem+0.2vw,1rem)] font-medium text-paper transition-opacity disabled:opacity-60"
                      >
                        {status === "submitting" ? "Submitting…" : "Submit Message"}
                      </motion.button>

                      <p className="mt-4 text-center text-[0.78rem] leading-relaxed  sm:text-xs">
                        Please ensure that your message is respectful,
                        factual, and relevant to public affairs. Parli
                        Access promotes constructive and responsible
                        citizen–representative engagement.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
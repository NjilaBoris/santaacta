"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

function TricolorMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex h-3 w-6 overflow-hidden rounded-[2px] ${className}`}>
      <span className="h-full w-1/3 bg-assembly-green" />
      <span className="h-full w-1/3 bg-assembly-red" />
      <span className="h-full w-1/3 bg-assembly-gold" />
    </span>
  );
}

const TOPICS = [
  "Roads, bridges and community infrastructure",
  "Water, sanitation and waste managemen",
  "Schools, health centres, markets and public facilities",
  "Community development projects",
  "Council services and activities",
  "Local development priorities",
  "Youth and women's concerns",
  "Environmental and community issues",
  "Council decisions and local policies",
  "Questions about projects or public resources"
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
      <label htmlFor={id} className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.06em]">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-assembly-red">
          {error}
        </p>
      )}
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        name={id}
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`${fieldBase} resize-none ${error ? "border-assembly-red/60" : "border-ink/15"}`}
      />
    </FieldShell>
  );
}

type FormState = {
  community: string;
  representative: string;
  subject: string;
  message: string;
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormState = {
  community: "",
  representative: "",
  subject: "",
  message: "",
  email: "",
  phone: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.community.trim()) errors.community = "Enter your community or quarter.";
  if (!form.representative.trim()) errors.representative = "Enter your Mayor or Councillor's name.";
  if (!form.subject.trim()) errors.subject = "Add a subject.";
  if (!form.message.trim()) errors.message = "Write your message.";
  if (!form.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (form.phone.trim() && !/^[+\d][\d\s]{6,}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}

export default function WriteToMpPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
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
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:sticky md:top-16 md:self-start"
          >
                                      <PageHero 
                                      imageSrc='/7.jpg' 
                                      imageAlt="Council services" 
                                      description=" Do you have a concern affecting your quarter, village, or community in Santa? ACTA gives residents a simple way to raise issues, ask questions, share ideas, and communicate directly with their local representatives.."
                                      title=" Write to your Mayor / Councillor"
                                      priority
                                      
                                      />
            
            <p className="mt-5 max-w-prose uppercase text-xs leading-relaxed text-ink/75 sm:mt-6">
              What can you write about?
            </p>

            <ul className="mt-7 flex flex-wrap gap-2 sm:mt-8">
              {TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-ink/10 bg-paper-alt px-3.5 py-1.5 text-[0.78rem] text-ink/70 sm:text-sm"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-prose text-neutral-500 text-xs leading-relaxed text-ink/75 sm:mt-6">
              Please provide accurate and respectful information. ACTA encourages constructive communication that helps citizens and local authorities identify community needs, discuss solutions, and improve local governance in Santa.
          </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-2xl border border-ink/10 bg-white/90 p-5 shadow-[0_1px_2px_rgba(28,35,33,0.04),0_16px_40px_-24px_rgba(28,35,33,0.25)] sm:p-7 md:rounded-3xl md:p-9"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[420px] flex-col items-start justify-center py-10"
                >
                  <TricolorMark className="mb-4" />
                  <h2 className="font-display text-[clamp(1.4rem,1.2rem+1vw,2rem)] font-medium">
                    Message sent to your representative
                  </h2>
                  <p className="mt-3 max-w-sm text-[clamp(0.9rem,0.86rem+0.2vw,1rem)] leading-relaxed text-ink/70">
                    Thank you for writing in. Your representative&apos;s office will review your message and follow up where appropriate.
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
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <h2 className="font-display text-[clamp(1.15rem,1.02rem+0.6vw,1.4rem)] font-medium">
                    Send Your Message
                  </h2>

                  <div className="mt-6 flex flex-col gap-4 sm:gap-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <TextField
                        id="community"
                        label="Community / Quarter"
                        placeholder="Enter your community or quarter"
                        value={form.community}
                        error={errors.community}
                        onChange={handleChange}
                      />
                      <TextField
                        id="representative"
                        label="Representative"
                        placeholder="Enter your Mayor or Councillor's name"
                        value={form.representative}
                        error={errors.representative}
                        onChange={handleChange}
                      />
                    </div>

                    <TextField
                      id="subject"
                      label="Subject"
                      placeholder="What is your message about?"
                      value={form.subject}
                      error={errors.subject}
                      onChange={handleChange}
                    />

                    <TextareaField
                      id="message"
                      label="Your Message"
                      placeholder="Write your message here..."
                      value={form.message}
                      error={errors.message}
                      onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <TextField
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        error={errors.email}
                        onChange={handleChange}
                      />
                      <TextField
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        placeholder="+237 6xx xxx xxx"
                        value={form.phone}
                        error={errors.phone}
                        onChange={handleChange}
                      />
                    </div>

                    {status === "error" && (
                      <p role="alert" className="text-sm text-assembly-red">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <div>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-[clamp(0.9rem,0.86rem+0.2vw,1rem)] font-medium text-paper transition-opacity disabled:opacity-60"
                      >
                        {status === "submitting" ? "Submitting…" : "Submit Message"}
                      </button>

                      <p className="mt-4 text-center text-[0.78rem] leading-relaxed sm:text-xs">
                        Please provide accurate and respectful information.
                      </p>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
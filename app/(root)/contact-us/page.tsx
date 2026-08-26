"use client";

import { useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";


function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0">
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="#334155" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <path d="M7 17L17 7M17 7H9M17 7v8" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.72rem] font-medium text-slate-500 sm:text-xs">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[clamp(0.85rem,0.8rem+0.15vw,0.95rem)] text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-400"
      />
    </div>
  );
}

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactSalesPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact-sales", {
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
    <main
      className={`relative min-h-screen bg-white pt-16`}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 md:py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          <div>
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-[clamp(2.1rem,1.55rem+2.4vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-slate-900"
            >
              Get in Touch
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.08 }}
              className="mt-4 max-w-md text-[clamp(0.9rem,0.84rem+0.25vw,1.05rem)] leading-relaxed text-slate-500 sm:mt-5"
            >
              We would love to hear from you  whether you have a question, suggestion, partnership proposal, or feedback about Parli Access.
            </motion.p>


            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.35 }}
              className="mt-10"
            >
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
                <h3 className="text-[0.95rem] font-semibold text-slate-900 sm:text-base">
                  General communication
                </h3>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-500 sm:text-sm">
                  For other queries, please get in touch with us via email.
                </p>
                <a
                  href="mailto:politicosinfo@gmail.com"
                  className="mt-3 flex items-center gap-1.5 text-[0.82rem] font-medium text-slate-700 hover:text-slate-900 sm:text-sm"
                >
                  <MailIcon />
                  politicosinfo@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-6 md:p-7"
          >
            <h2 className="text-[clamp(1.05rem,0.98rem+0.35vw,1.25rem)] font-semibold text-slate-900">
              Contact our sales team
            </h2>

            {status === "success" ? (
              <div role="status" aria-live="polite" className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-[0.95rem] font-medium text-slate-900">Message sent</p>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-500">
                  Thanks for reaching out  we&apos;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-[0.82rem] font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:mt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField
                    id="firstName"
                    label="First name"
                    value={form.firstName}
                    onChange={update("firstName")}
                    placeholder="Johaness Mark"
                  />
                  <TextField
                    id="lastName"
                    label="Last name"
                    value={form.lastName}
                    onChange={update("lastName")}
                    placeholder="Parker"
                  />
                </div>

                <TextField
                  id="email"
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="contact.youremail.com"
                />

                <TextField
                  id="phone"
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+237 XXX XXX XXX"
                />

                <TextField
                  id="subject"
                  label="Subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Subject of your message"
                />

                <div>
                  <label htmlFor="message" className="block text-[0.72rem] font-medium text-slate-500 sm:text-xs">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    placeholder="Tell us more about your project..."
                    className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[clamp(0.85rem,0.8rem+0.15vw,0.95rem)] text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-400"
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-[0.82rem] text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                  className="mt-1 w-full rounded-lg bg-gradient-to-b from-slate-900 to-[#0B1220] px-6 py-3.5 text-[clamp(0.88rem,0.84rem+0.2vw,1rem)] font-medium text-white transition-opacity disabled:opacity-70 sm:mt-2"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
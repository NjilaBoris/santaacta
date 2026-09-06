"use client";

import { useState, type ReactNode } from "react";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import { motion } from "framer-motion";


function Icon({ children, className = "h-full w-full" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const DocumentIcon = () => (
  <Icon>
    <rect x="16" y="10" width="32" height="44" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M23 24h18M23 32h18M23 40h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);

const BuildingIcon = () => (
  <Icon>
    <rect x="18" y="18" width="28" height="36" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M32 8l16 10H16z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M25 30h4M35 30h4M25 40h4M35 40h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);

const MarketIcon = () => (
  <Icon>
    <path d="M12 22l4-10h32l4 10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 22c0 4 3.5 6 6 6s6-2 6-6c0 4 3.5 6 6 6s6-2 6-6c0 4 3.5 6 6 6s6-2 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 28v22h32V28" stroke="currentColor" strokeWidth="2" />
  </Icon>
);

const BroomIcon = () => (
  <Icon>
    <path d="M40 12L24 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 40l-9 10 4 4 10-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 50l6-6 6 6-3 4h-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="44" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
  </Icon>
);

const ClockIcon = () => (
  <Icon>
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" />
    <path d="M32 20v12l9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const PersonIcon = () => (
  <Icon>
    <circle cx="32" cy="22" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M14 52c2-11 9.5-17 18-17s16 6 18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);

const CoinIcon = () => (
  <Icon>
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" />
    <path d="M32 22v20M26 27c0-3 3-5 6-5s6 2 6 5-3 4-6 4-6 1-6 4 3 5 6 5 6-2 6-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);

const CheckIcon = () => (
  <Icon>
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" />
    <path d="M23 33l6 6 12-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const PinIcon = () => (
  <Icon>
    <path d="M32 54s16-14.5 16-27a16 16 0 10-32 0c0 12.5 16 27 16 27z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="32" cy="27" r="6" stroke="currentColor" strokeWidth="2" />
  </Icon>
);

const AlertIcon = () => (
  <Icon>
    <path d="M32 10l24 42H8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M32 26v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="42" r="1.5" fill="currentColor" />
  </Icon>
);

/* ── Small building blocks ──────────────────────────────── */

const accent = {
  verdigris: { text: "text-[#4B7267]", bg: "bg-[#4B7267]/10", ring: "ring-[#4B7267]/20" },
  ochre: { text: "text-[#B8863B]", bg: "bg-[#B8863B]/10", ring: "ring-[#B8863B]/20" },
};

function Tag({ label, tone }: { label: string; tone: keyof typeof accent }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${accent[tone].bg} ${accent[tone].text}`}>
      {label}
    </span>
  );
}

function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[#5B6270]">
      <span className="h-4 w-4 shrink-0 text-[#5B6270]">{icon}</span>
      {children}
    </span>
  );
}

function LocationPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[#E4DCC8] bg-white px-3 py-1.5 text-xs font-medium text-[#23262B]">
      <span className="h-3.5 w-3.5 text-[#5B6270]"><PinIcon /></span>
      {label}
    </span>
  );
}

type ServiceRowProps = {
  title: string;
  tone: keyof typeof accent;
  category: string;
  description: string;
  metas: { icon: ReactNode; label: string }[];
  location: string;
};

function ServiceRow({ title, tone, category, description, metas, location }: ServiceRowProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E4DCC8] py-6 sm:flex-row sm:items-start sm:justify-between first:pt-0 last:border-b-0">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className=" text-lg text-[#16233A] sm:text-xl">{title}</h3>
          <Tag label={category} tone={tone} />
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5B6270] sm:text-base">{description}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {metas.map((m, i) => (
            <MetaItem key={i} icon={m.icon}>{m.label}</MetaItem>
          ))}
        </div>
      </div>
      <LocationPill label={location} />
    </div>
  );
}

function ChecklistCard({ title, tone, category, intro, items, note }: {
  title: string; tone: keyof typeof accent; category: string; intro: string; items: string[]; note?: string;
}) {
  return (
    <div className="border-b border-[#E4DCC8] py-6 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg text-[#16233A] sm:text-xl">{title}</h3>
        <Tag label={category} tone={tone} />
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5B6270] sm:text-base">{intro}</p>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#23262B] sm:text-base">
            <span className={`mt-1 h-3.5 w-3.5 shrink-0 ${accent[tone].text}`}><CheckIcon /></span>
            {item}
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-sm italic text-[#5B6270]">{note}</p>}
    </div>
  );
}

function ReportForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-2xl border border-[#B8863B]/25 bg-[#B8863B]/[0.06] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="h-8 w-8 text-[#B8863B]"><AlertIcon /></span>
        <div>
          <h3 className="text-lg text-[#16233A]">Report a market issue</h3>
          <p className="text-sm text-[#5B6270]">Noticed a problem in a market in Santa? Send a report to the relevant authorities.</p>
        </div>
      </div>

      {sent ? (
        <p className="mt-6 text-sm font-medium text-[#4B7267]">
          Thanks — your report has been noted for the Council&apos;s market service.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Field label="Full name" placeholder="Enter your full name" />
          <Field label="Email address" placeholder="Enter your email address" type="email" />
          <Field label="Phone number" placeholder="Enter your phone number" type="tel" />
          <Field label="Market / location" placeholder="Enter the market or locality" />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-[#23262B]">Details</label>
            <textarea
              placeholder="Describe the issue. You may attach a photo or relevant document."
              rows={4}
              className="w-full rounded-lg border border-[#E4DCC8] bg-white px-3.5 py-2.5 text-sm text-[#23262B] outline-none placeholder:text-[#9CA0A8] focus:border-[#B8863B]"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#16233A] px-6 py-2.5 text-sm font-medium text-[#F5F1E6] transition-colors hover:bg-[#233657]"
            >
              Submit report
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#23262B]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#E4DCC8] bg-white px-3.5 py-2.5 text-sm text-[#23262B] outline-none placeholder:text-[#9CA0A8] focus:border-[#B8863B]"
      />
    </div>
  );
}


function Tile({ icon, tone, className, delay }: { icon: ReactNode; tone: keyof typeof accent; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E4DCC8] bg-white p-3.5 shadow-sm sm:h-20 sm:w-20 ${accent[tone].text} ${className}`}
    >
      {icon}
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function CouncilServices() {
  return (
    <main className={` bg-[#F5F1E6]`}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 sm:pt-24 lg:px-16">
        <div className="relative mx-auto max-w-3xl">
          {/* mobile: simple icon row */}
          <div className="mb-8 flex justify-center gap-3 md:hidden">
            <Tile icon={<DocumentIcon />} tone="verdigris" className="static" delay={0} />
            <Tile icon={<BuildingIcon />} tone="ochre" className="static" delay={0.08} />
            <Tile icon={<MarketIcon />} tone="verdigris" className="static" delay={0.16} />
            <Tile icon={<BroomIcon />} tone="ochre" className="static" delay={0.24} />
          </div>

          {/* desktop/tablet: scattered collage */}
          <Tile icon={<DocumentIcon />} tone="verdigris" className="absolute -left-6 top-2 hidden rotate-[-6deg] md:flex lg:-left-16" delay={0} />
          <Tile icon={<BuildingIcon />} tone="ochre" className="absolute -right-4 -top-6 hidden rotate-[5deg] md:flex lg:-right-14" delay={0.08} />
          <Tile icon={<MarketIcon />} tone="verdigris" className="absolute -bottom-4 -right-2 hidden rotate-[4deg] md:flex lg:-right-10" delay={0.16} />
          <Tile icon={<BroomIcon />} tone="ochre" className="absolute -bottom-6 left-0 hidden rotate-[-4deg] md:flex lg:-left-10" delay={0.24} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="font-[family-name:var(--font-fraunces)] text-[clamp(1.9rem,4.6vw,3rem)] leading-tight text-[#16233A]">
              Council Services
            </h1>
            <p className="mt-2 text-base font-medium text-[#4B7267] sm:text-lg">Services for residents</p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#5B6270] sm:text-base">
              Civil registration, permits, market management and hygiene: the
              services residents interact with most directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 0.6, duration: 0.5 }, y: { delay: 1, duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
            className="mx-auto mt-10 h-6 w-6 text-[#5B6270]"
          >
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v14M6 12l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.div>
        </div>
      </section>

      {/* ── Registry intro banner ───────────────────────── */}
      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-[#16233A] px-6 py-12 text-center sm:px-12 sm:py-16"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F1E6]/10 text-[#F5F1E6]">
            <span className="h-6 w-6"><DocumentIcon /></span>
          </span>
          <h2 className="text-2xl text-[#F5F1E6] sm:text-3xl">
            Four services, one registry
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#F5F1E6]/70 sm:text-base">
            The Santa Council Civil Status Registry provides essential civil
            registration services, including the registration and
            documentation of births, marriages, and deaths.
          </p>
        </motion.div>
      </section>

      {/* ── Listings ─────────────────────────────────────── */}
      <section className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">

          {/* Civil Registration */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mb-14"
          >
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mb-4 text-sm font-semibold text-[#16233A]"
            >
              Civil Registration
            </motion.h2>
            <div className="rounded-2xl border border-[#E4DCC8] py-6 bg-white/60 px-6">
              {[
                {
                  title: "Birth declaration & certificate",
                  description: "Records the birth of a child and establishes their legal identity, declared through the Civil Status Registry.",
                  metas: [
                    { icon: <ClockIcon />, label: "Register within the legal period" },
                    { icon: <PersonIcon />, label: "Declared by health facility or witness" },
                  ],
                },
                {
                  title: "Marriage registration & certificate",
                  description: "The official process through which a civil marriage is declared and recorded, completed before the ceremony.",
                  metas: [
                    { icon: <DocumentIcon />, label: "Birth certs, ID & witnesses required" },
                    { icon: <PersonIcon />, label: "Extra documents for special cases" },
                  ],
                },
                {
                  title: "Death declaration & certificate",
                  description: "The official registration of a person's death, enabling the Registry to issue the death certificate.",
                  metas: [
                    { icon: <ClockIcon />, label: "Declare within 90 days" },
                    { icon: <PersonIcon />, label: "Certified by two witnesses" },
                  ],
                },
              ].map((row) => (
                <motion.div key={row.title} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                  <ServiceRow
                    title={row.title}
                    tone="verdigris"
                    category="Civil Registration"
                    description={row.description}
                    metas={row.metas}
                    location="Civil Status Registry"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Building & Demolition Permits */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mb-14"
          >
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mb-4 text-sm font-semibold text-[#16233A]"
            >
              Building &amp; Demolition Permits
            </motion.h2>
            <div className="rounded-2xl border border-[#E4DCC8] py-6 bg-white/60 px-6">
              {[
                {
                  title: "Building permit",
                  description: "Apply with architectural and site plans, specifications and cost estimates, plus payment of applicable Council fees.",
                  metas: [
                    { icon: <DocumentIcon />, label: "Architectural & site plans required" },
                    { icon: <CoinIcon />, label: "Council & admin fees apply" },
                  ],
                },
                {
                  title: "Demolition permit",
                  description: "Submit a formal application to the Mayor and obtain Council authorisation before demolition begins.",
                  metas: [
                    { icon: <DocumentIcon />, label: "Applied for via the Mayor's office" },
                    { icon: <CheckIcon />, label: "Technical assessment where required" },
                  ],
                },
              ].map((row) => (
                <motion.div key={row.title} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
                  <ServiceRow
                    title={row.title}
                    tone="ochre"
                    category="Permits"
                    description={row.description}
                    metas={row.metas}
                    location="Town Planning Service"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Market Management */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mb-14"
          >
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mb-4 text-sm font-semibold text-[#16233A]"
            >
              Market Management
            </motion.h2>
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E4DCC8] py-6 bg-white/60 px-6">
                <ChecklistCard
                  title="Santa Council markets"
                  tone="verdigris"
                  category="Market Management"
                  intro="The Santa Council manages municipal markets across Santa Subdivision, supporting orderly trading and maintaining market facilities."
                  items={[
                    "Management of municipal markets and trading spaces",
                    "Maintenance and improvement of market facilities",
                    "Support for orderly and lawful trading",
                    "Management of market stalls and commercial spaces",
                    "Sanitation and cleanliness within market areas",
                    "Addressing concerns affecting traders and market users",
                  ]}
                />
              </div>
              <ReportForm />
            </div>
          </motion.div>

          {/* Hygiene & Sanitation */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="mb-4 text-sm font-semibold text-[#16233A]"
            >
              Hygiene &amp; Sanitation
            </motion.h2>
            <div className="rounded-2xl border border-[#E4DCC8] py-6 bg-white/60 px-6">
              <ChecklistCard
                title="Cleanliness & public health"
                tone="ochre"
                category="Hygiene & Sanitation"
                intro="The Santa Council supports cleanliness and healthy living conditions across the municipality through sanitation activities, inspections, and waste management services."
                items={[
                  "Collection and disposal of waste from markets and public spaces",
                  "Cleaning and maintenance of public places",
                  "Inspection of building sites for hygiene compliance",
                  "Inspection of unhygienic environments and drainage",
                  "Monitoring of conditions that may pose public health risks",
                  "Community sensitisation on sanitation and waste disposal",
                ]}
                note="Residents are encouraged to keep their surroundings clean and report sanitation concerns through the appropriate Council channels."
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
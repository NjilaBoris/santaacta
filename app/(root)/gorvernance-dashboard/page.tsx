"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Users,
  Layers,
  Network,
  Crown,
  UserCheck,
  FileSignature,
  Landmark,
  type LucideIcon,
} from "lucide-react";


const TOTAL_SEATS = 180;
const WOMEN = 61;
const WOMEN_PCT = 33.9;

interface Party {
  name: string;
  short: string;
  seats: number;
  color: string;
}

const parties: Party[] = [
  { name: "Cameroon People's Democratic Movement", short: "CPDM", seats: 152, color: "#0B3B2E" },
  { name: "National Union for Democracy & Progress", short: "NUDP", seats: 7, color: "#8B1E1E" },
  { name: "Cameroonian Party for National Reconciliation", short: "PCRN", seats: 5, color: "#B08D57" },
  { name: "Social Democratic Front", short: "SDF", seats: 5, color: "#6B8577" },
  { name: "Cameroon Democratic Union", short: "CDU / UDC", seats: 4, color: "#A9825B" },
  { name: "Union of Socialist Movements", short: "UMS", seats: 4, color: "#7A6A56" },
  { name: "Cameroon National Salvation Front", short: "FSNC", seats: 3, color: "#9C9284" },
];

interface BureauRole {
  no: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const bureau: BureauRole[] = [
  {
    no: "01",
    icon: Crown,
    title: "President",
    description: "Speaker of the House",
  },
  {
    no: "06",
    icon: UserCheck,
    title: "Vice Presidents",
    description: "Including the Senior Vice President",
  },
  {
    no: "12",
    icon: FileSignature,
    title: "Secretaries",
    description: "Record-keeping and procedural support",
  },
  {
    no: "04",
    icon: Landmark,
    title: "Questors",
    description: "Financial administration",
  },
];

const stats = [
  { icon: Users, value: "180", label: "Parliamentarians" },
  { icon: Layers, value: "09", label: "Committees" },
  { icon: Network, value: "21", label: "Parliamentary networks" },
];

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};


function GenderRing() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const fraction = WOMEN_PCT / 100;

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className="h-14 w-14 shrink-0 -rotate-90 sm:h-16 sm:w-16"
    >
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="#0B3B2E1A"
        strokeWidth="10"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="#8B1E1E"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: fraction } : { pathLength: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </svg>
  );
}


function StatsRow() {
  return (
    <motion.div
      variants={gridContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#0B3B2E]/10 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            className="flex flex-col gap-3  p-5 sm:p-6"
          >
            <Icon className="h-5 w-5 text-neutral-800" strokeWidth={1.75} />
            <div>
              <div className=" text-[clamp(1.5rem,1.3rem+1vw,2rem)] font-medium leading-none">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[0.82rem]">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        variants={cardVariants}
        className="flex items-center gap-4 bg-[#FBF9F4] p-5 sm:p-6"
      >
        <GenderRing />
        <div>
          <div className=" text-[clamp(1.5rem,1.3rem+1vw,2rem)] font-medium leading-none">
            {WOMEN}
          </div>
          <div className="mt-1.5 text-[0.82rem]">
            Women ({WOMEN_PCT}%)
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


function SeatAllocation() {
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, amount: 0.5 });

  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="text-[clamp(1.15rem,1.05rem+0.4vw,1.4rem)] font-semibold">
          Seat allocation by political party
        </h2>
        <span className="text-[0.72rem] uppercase tracking-[0.12em]">
          180 seats — 10th legislature
        </span>
      </div>

      <div
        ref={barRef}
        className="mt-6 flex h-4 w-full overflow-hidden rounded-full bg-[#0B3B2E]/[0.06] sm:h-5"
      >
        {parties.map((party) => (
          <motion.div
            key={party.short}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: party.color }}
            initial={{ width: 0 }}
            animate={
              inView
                ? { width: `${(party.seats / TOTAL_SEATS) * 100}%` }
                : { width: 0 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <motion.ul
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
      >
        {parties.map((party) => (
          <motion.li
            key={party.short}
            variants={cardVariants}
            className="flex items-center justify-between gap-4 border-b border-[#0B3B2E]/[0.08] pb-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: party.color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <div className="font-[family-name:var(--font-plex-mono)] text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#0B3B2E]">
                  {party.short}
                </div>
                <div className="truncate text-[0.82rem] text-[#1C1B18]/60">
                  {party.name}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-baseline gap-1.5 font-[family-name:var(--font-plex-mono)]">
              <span className="text-[1.05rem] font-medium text-[#0B3B2E]">
                {party.seats}
              </span>
              <span className="text-[0.68rem] text-[#1C1B18]/45">
                {((party.seats / TOTAL_SEATS) * 100).toFixed(1)}%
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}


function BureauSection() {
  return (
    <div className="mt-16 sm:mt-20">
      <h2 className="text-[clamp(1.15rem,1.05rem+0.4vw,1.4rem)] font-semibold">
        The Bureau
        <span className="ml-2  text-sm font-normal text-[#0B3B2E]/50">
           23 members
        </span>
      </h2>

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#0B3B2E]/10 bg-[#0B3B2E]/10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {bureau.map((role) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.title}
              variants={cardVariants}
              className="flex flex-col gap-4 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-neutral-800" strokeWidth={1.75} />
                <span className="text-[clamp(1.3rem,1.1rem+1vw,1.75rem)] font-medium 5">
                  {role.no}
                </span>
              </div>
              <div>
                <div className="text-[1rem] font-semibold">
                  {role.title}
                </div>
                <p className="mt-1 text-[0.82rem] leading-snug text-[#1C1B18]/60">
                  {role.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}


export default function ParliamentaryDashboard() {
  return (
    <section
      className={`relative w-full overflow-hidden pt-10`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 100% 0%, rgba(176,141,87,0.10) 0%, transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(11,59,46,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-center gap-3  text-[clamp(0.68rem,0.63rem+0.2vw,0.78rem)] uppercase tracking-[0.18em] sm:mb-6"
          >
            10th Legislature
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-[clamp(2rem,1.5rem+2.3vw,3.5rem)] font-semibold leading-[1.1] tracking-tight"
          >
            Parliamentary Dashboard
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-pretty text-[clamp(0.95rem,0.88rem+0.35vw,1.15rem)] leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
            A live-style roll call of the 10th Legislature  composition,
            gender balance, and the Bureau.
          </motion.p>
        </motion.div>

        <div className="mt-12 sm:mt-14">
          <StatsRow />
        </div>

        <SeatAllocation />
        <BureauSection />
      </div>
    </section>
  );
}
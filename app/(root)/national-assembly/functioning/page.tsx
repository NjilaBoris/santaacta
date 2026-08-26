"use client";

import { motion, type Variants } from "framer-motion";


interface SessionFact {
  id: string;
  label: string;
  detail: string;
}

interface Stage {
  number: string;
  title: string;
}

const sessionFacts: SessionFact[] = [
  {
    id: "ordinary",
    label: "3 ordinary sessions a year",
    detail: "March, June, and November — each capped at thirty days.",
  },
  {
    id: "extraordinary",
    label: "Extraordinary sessions",
    detail:
      "Up to fifteen days on a fixed agenda, convened by the President or one third of members.",
  },
  {
    id: "public",
    label: "Sittings held in public",
    detail: "Sittings in camera are permitted only exceptionally.",
  },
];

const stages: Stage[] = [
  { number: "01", title: "Admissibility of the bill" },
  { number: "02", title: "Announcement in plenary" },
  { number: "03", title: "Examination in committee" },
  { number: "04", title: "Submission of committee reports" },
  { number: "05", title: "Adoption in plenary sitting" },
  { number: "06", title: "Shuttling between chambers" },
  { number: "07", title: "Signature and forwarding" },
  { number: "08", title: "Enactment by the President" },
];

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LegislativeProcedure() {
  return (
    <section
      className={`relative w-full lg:pt-20 md:pt-8 pt-6`}
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-center gap-3 text-gray-600 text-[clamp(0.68rem,0.63rem+0.2vw,0.78rem)] uppercase tracking-[0.18em] sm:mb-6"
          >
            Legislative operations
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-balance text-[clamp(1.9rem,1.5rem+2vw,3.1rem)] font-semibold leading-[1.1] tracking-tight text-gray-700"
          >
            Functioning &amp; procedure
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
            The Assembly meets in a statutory ordinary session on the second
            Tuesday following the proclamation of election results, then
            holds three ordinary sessions a year, each capped at thirty days.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75"
          >
            Sittings are held in public, with sittings in camera permitted
            only exceptionally. Legislative business moves through eight
            defined stages, from the admissibility of a bill to its enactment
            by the President of the Republic.
          </motion.p>
        </motion.div>
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#0B3B2E]/10 bg-[#0B3B2E]/10 sm:mt-12 sm:grid-cols-3"
        >
          {sessionFacts.map((fact) => (
            <motion.div
              key={fact.id}
              variants={cardVariants}
              className="flex flex-col bg-[#FCFAF4] p-6 sm:p-7"
            >
              <span className="text-[clamp(1rem,0.94rem+0.3vw,1.15rem)] font-semibold leading-snug text-gray-700">
                {fact.label}
              </span>
              <span className="mt-2 text-[clamp(0.82rem,0.78rem+0.2vw,0.92rem)] leading-relaxed text-[#1C1B18]/65">
                {fact.detail}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3 sm:mb-10"
          >
            <span className=" text-[clamp(0.68rem,0.63rem+0.2vw,0.78rem)] uppercase tracking-[0.18em] text-gray-600">
              The path of a bill
            </span>
            
          </motion.div>

          <motion.ol
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          >
            {stages.map((stage) => (
              <motion.li
                key={stage.number}
                variants={cardVariants}
                className="group relative flex flex-col rounded-xl border border-[#0B3B2E]/10 bg-[#FCFAF4] p-5 transition-colors hover:border-[#B08D57]/50 sm:p-6"
              >
                <span className="font-[family-name:var(--font-plex-mono)] text-[clamp(1.3rem,1.2rem+0.6vw,1.6rem)] font-medium text-gray-700">
                  {stage.number}
                </span>
                <span className="mt-2 text-[clamp(0.92rem,0.87rem+0.25vw,1.02rem)] font-semibold leading-snug text-gray-500">
                  {stage.title}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion, type Variants } from "framer-motion";


interface Stage {
  number: string;
  title: string;
}

interface SessionFact {
  id: string;
  label: string;
  detail: string;
}

const sessionFacts: SessionFact[] = [
  {
    id: "ordinary",
    label: "Mme Wopong Constance Awa",
    detail: "Secretary General",
  },
  {
    id: "extraordinary",
    label: "Mme Muluhkoh Salonie Mengwi",
    detail:
      "Municipal Treasurer",
  },
];

const stages: Stage[] = [
  { number: "Mayor", title: "Councillor Samkie Elvis Gahnyam II" },
  { number: "1st Deputy Mayor", title: "Councillor Cho Eric Ndikum" },
  { number: "2nd Deputy Mayor", title: "Councillor Javice Azong Tabefor" },
  { number: "3rd Deputy Mayor", title: "Councillor Fonjindam Jannette Fuche" },
  { number: "4th Deputy Mayor", title: "Councillor Hassan Oumarou" },
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
            Executive & Leadership
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-balance text-[clamp(1.9rem,1.5rem+2vw,3.1rem)] font-semibold leading-[1.1] tracking-tight text-gray-700"
          >
            Council Executive
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
          The Santa Council Executive provides political and administrative leadership for the municipality: guiding Council affairs, overseeing local development priorities, and supporting the delivery of municipal services.
          </motion.p>
        </motion.div>
        <div className="mt-14 sm:mt-16 lg:mt-20">
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
                <span className=" text-[clamp(0.92rem,0.87rem+0.25vw,1.02rem)] font-medium text-gray-700">
                 {stage.number}
                </span>
                 <span className="mt-2 text-[clamp(1rem,1rem+0.3vw,1rem)] font-semibold leading-snug text-gray-500">
                  {stage.title}
                </span>
              </motion.li>
            ))}
          </motion.ol>       

            <motion.h2
            variants={fadeUp}
            className="text-balance text-[clamp(1.3rem,1.1rem+2vw,2.1rem)] my-8 font-semibold leading-[1.1] tracking-tight text-gray-700"
          >
            Technical & Administrative Support
          </motion.h2>
           <motion.p
            variants={fadeUp}
            className="mt-5 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
          The Council Executive is supported by technical and administrative personnel who contribute to the effective management of Council operations.
          </motion.p>
            <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#0B3B2E]/10 bg-[#0B3B2E]/10 sm:mt-12 sm:grid-cols-2"
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
        </div>
      </div>
    </section>
  );
}
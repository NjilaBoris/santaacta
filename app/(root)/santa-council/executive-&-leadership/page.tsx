"use client";

import { motion, type Variants } from "framer-motion";


interface Stage {
  number: string;
  title: string;
}


const stages: Stage[] = [
  { number: "29", title: "Far North" },
  { number: "28", title: "Centre" },
  { number: "25", title: "West" },
  { number: "20", title: "North West" },
  { number: "19", title: "Littoral" },
  { number: "15", title: "South West" },
  { number: "12", title: "North" },
  { number: "11", title: "East" },
  { number: "11", title: "South" },
  { number: "10", title: "Adamaoua" },
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
            organization
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-balance text-[clamp(1.9rem,1.5rem+2vw,3.1rem)] font-semibold leading-[1.1] tracking-tight text-gray-700"
          >
            Institutional organization
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
           <span className="font-semibold text-neutral-900">The Bureau</span>   the principal governing body, elected each legislative year: 1 President, 1 Senior Vice President, 5 Vice Presidents, 4 Questors, and 12 Secretaries, with the Secretary General sitting ex officio.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75"
          >
           <span className="font-semibold text-neutral-900">The Chairmen&apos;s Conference</span> established under Section 39 of Law No. 2014/16, gathering the President, Bureau members, the nine Committee Chairpersons, and Parliamentary Group leaders to set the agenda and rule on bill admissibility.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-pretty text-[clamp(0.92rem,0.86rem+0.3vw,1.08rem)] leading-relaxed text-[#1C1B18]/75"
          >
          <span className="font-semibold text-neutral-900">The Secretariat General</span>  administrative continuity under the Secretary General and two Deputy Secretaries General, overseeing legislative affairs, international relations, budget, and documentary information.
          </motion.p>
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
              Composition by region  10th Legislature
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
                <span className="mt-2 text-[clamp(1rem,1rem+0.3vw,1rem)] font-semibold leading-snug text-gray-500">
                 Region : {" "} {stage.title}
                </span>
                <span className=" text-[clamp(0.92rem,0.87rem+0.25vw,1.02rem)] font-medium text-gray-700">
                 Seats : {" "} {stage.number}
                </span>
              </motion.li>
            ))}
          </motion.ol>
           <h6 className="text-sm mt-4 text-neutral-500">180 members across 49 constituencies representing all ten regions  119 men and 61 women in the current legislature.</h6>
        </div>
      </div>
    </section>
  );
}
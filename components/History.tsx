"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

interface HistoryEvent {
  id: string;
  date: string;
  era: string;
  title: string;
  description: string;
  current?: boolean;
}

const events: HistoryEvent[] = [
  {
    id: "1946",
    date: "22 DEC 1946",
    era: "Colonial administration",
    title: "Representative Assembly of Cameroon",
    description:
      "Established under French colonial law, comprising forty members twenty-four Cameroonian and sixteen French.",
  },
  {
    id: "1952",
    date: "1952",
    era: "Constitutional evolution",
    title: "Territorial Assembly of Cameroon",
    description:
      "The body evolves into the Territorial Assembly as part of successive constitutional stages.",
  },
  {
    id: "1957",
    date: "1957",
    era: "Pre-independence",
    title: "Legislative Assembly of Cameroon",
    description:
      "Reconstituted with expanded legislative authority ahead of independence.",
  },
  {
    id: "1960",
    date: "10 APR 1960",
    era: "Independence",
    title: "National Assembly established",
    description:
      "Reconstituted as the National Assembly, coinciding with the independence of the Republic of Cameroon.",
  },
  {
    id: "1962",
    date: "1962",
    era: "Reunification",
    title: "Federal Assembly formed",
    description:
      "British Cameroons representatives — formerly seated in Nigeria's legislative organs under the Macpherson Constitution — are consolidated into a Federal Assembly following reunification.",
  },
  {
    id: "1972",
    date: "2 JUN 1972",
    era: "Unitary state",
    title: "Unitary state constituted",
    description:
      "A single National Assembly is formed under the new Constitution; its first members are elected on 18 May 1973.",
  },
  {
    id: "1996",
    date: "18 JAN 1996",
    era: "Current structure",
    title: "Bicameral Parliament introduced",
    description:
      "Legislative authority is shared between the 180-member National Assembly and the 100-member Senate (70 elected regionally, 30 presidentially appointed).",
    current: true,
  },
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

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

export default function NationalAssemblyHistory() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.4"],
  });

  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className={` relative w-full overflow-hidden `}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 flex items-center gap-3 font-[family-name:var(--font-plex-mono)] text-[clamp(0.68rem,0.63rem+0.2vw,0.78rem)] uppercase tracking-[0.18em] text-[#8B1E1E] sm:mb-6"
          >
            Historical foundation
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-[clamp(2.1rem,1.6rem+2.4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight "
          >
            The National Assembly
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-pretty text-[clamp(0.95rem,0.88rem+0.35vw,1.15rem)] font-normal leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
            The oldest institution of the modern Cameroonian state — its
            foundation, functioning, organization, and composition.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-baseline gap-2 font-[family-name:var(--font-plex-mono)] text-[clamp(0.72rem,0.68rem+0.15vw,0.82rem)] text-[#0B3B2E]/70 sm:mt-10"
          >
            <span className="text-[clamp(1.4rem,1.2rem+1vw,1.9rem)] font-medium ">
              1946–1996
            </span>
            <span>· seven constitutional stages, one continuous institution</span>
          </motion.div>
        </motion.div>
        <div ref={timelineRef} className="relative mt-14 sm:mt-16 lg:mt-20">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0B3B2E]/10 sm:left-[calc(6.5rem+7px)]"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[7px] top-2 w-px origin-top bg-[#B08D57] sm:left-[calc(6.5rem+7px)]"
            style={{ scaleY: spineScale, height: "calc(100% - 1rem)" }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-10 sm:gap-12">
            {events.map((event) => (
              <motion.li
                key={event.id}
                variants={rowVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="relative grid grid-cols-[1rem_1fr] gap-x-5 pl-0 sm:grid-cols-[6.5rem_1rem_1fr] sm:gap-x-6"
              >
                <div className="hidden pt-[0.3rem] text-right  text-[0.78rem] font-medium tracking-wide  sm:block">
                  {event.date}
                </div>

                <div className="relative flex justify-center pt-[0.35rem]">
                  <motion.span
                    variants={nodeVariants}
                    className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      event.current
                        ? "border-[#8B1E1E] bg-[#8B1E1E]"
                        : "border-[#B08D57] bg-[#F7F3EA]"
                    }`}
                  >
                    {event.current && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F7F3EA]" />
                    )}
                  </motion.span>
                </div>

               
                <div className="pb-1">
                 
                  <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1  text-[0.7rem] font-medium tracking-wide  sm:hidden">
                    <span>{event.date}</span>
                    <span className="text-[#0B3B2E]/30">·</span>
                    <span className="uppercase tracking-[0.1em] ">
                      {event.era}
                    </span>
                  </div>

                  <div className="mb-1.5 hidden  text-[0.68rem] font-medium uppercase tracking-[0.14em]  sm:block">
                    {event.era}
                  </div>

                  <h3 className="text-[clamp(1.05rem,0.98rem+0.35vw,1.3rem)] font-semibold leading-snug ">
                    {event.title}
                    {event.current && (
                      <span className="ml-2 inline-block translate-y-[-0.05em] rounded-full bg-[#8B1E1E]/10 px-2 py-0.5 align-middle  text-[0.62rem] font-medium uppercase tracking-[0.1em] text-[#8B1E1E]">
                        In force
                      </span>
                    )}
                  </h3>

                  <p className="mt-1.5 max-w-2xl text-pretty text-[clamp(0.88rem,0.83rem+0.2vw,1rem)] leading-relaxed text-[#1C1B18]/70">
                    {event.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
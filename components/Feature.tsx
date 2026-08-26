"use client";

import { IconBuildingBank, IconClipboardText, IconMessage, IconUser } from "@tabler/icons-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";


type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  bg: string;
  href: string;
};

const FEATURES: Feature[] = [
  {
    icon: <IconBuildingBank stroke={2} className="text-neutral-500"/>,
    title: "Santa Council",
    description: "History, geography and how the Council is organised and run..",
    cta: "EXPLORE",
    bg: "bg-sky-50",
    href: "/national-assembly/history"
  },
  {
    icon: <IconUser stroke={2} className="text-neutral-500"/>,
    title: "Council Services",
    description: "Civil registration, building permits, market management, hygiene..",
    cta: "SEARCH",
    bg: "bg-amber-50",
    href: "/engage/mp"
  },
  {
    icon: <IconClipboardText stroke={2} className="text-neutral-500"/>,
    title: "Governance Dashboard",
    description: "Councillors, committees and representation, in numbers..",
    cta: "FOLLOW",
    bg: "bg-emerald-50",
    href: "/blog"
  },
  {
    icon: <IconMessage stroke={2} className="text-neutral-500"/>,
    title: "Engage",
    description: "Write to your mayor or councillor. Take the current poll..",
    cta: "ENGAGE",
    bg: "bg-rose-50",
    href: "/engage/write-council"
  },
];



const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeatureGrid() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-12">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-10  sm:mb-12 md:mb-14  lg:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.15] tracking-tight text-neutral-900">
              Acta, made accessible
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-500 sm:mt-4 sm:text-[15px] md:text-base">
              Everything you need to understand and engage with Acta  in one place.
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.article
              key={feature.title}
              variants={cardVariant}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex h-full flex-col justify-between rounded-2xl ${feature.bg} p-5 sm:p-6`}
            >
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl sm:mb-6 sm:h-14 sm:w-14 sm:text-2xl">
                  <span role="img" aria-hidden="true">
                    {feature.icon}
                  </span>
                </div>

                <h3 className="text-[15.5px] font-semibold text-neutral-900 sm:text-base md:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-600 sm:text-[13.5px]">
                  {feature.description}
                </p>
              </div>

              <Link
                href={feature.href}
                className="mt-6 inline-flex w-fit items-center gap-1.5 border-b border-neutral-900/40 pb-0.5 font-mono text-[11px] font-semibold tracking-[0.06em] text-neutral-900 transition-colors hover:border-neutral-900 sm:mt-8 sm:text-[11.5px]"
              >
                {feature.cta} <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { Spectral, IBM_Plex_Mono } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import {
  Gavel,
  ScrollText,
  Vote,
  BookOpen,
  Newspaper,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";



interface Resource {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  cta: string;
  external: boolean;
}

const resources: Resource[] = [
  {
    id: "standing-orders",
    icon: Gavel,
    name: "Law No. 2019/024 of 24 December 2019",
    description:
      "Bill to institute the general code of regional and local authorities.",
    href: "https://www.prc.cm/en/news/the-acts/laws/4049-law-no-2019-024-of-24-december-2019-bill-to-institute-the-general-code-of-regional-and-local-authorities",
    cta: "Open PDF",
    external: true,
  },
  {
    id: "constitution",
    icon: ScrollText,
    name: "Electoral Code",
    description:
      "The electoral code governing elections in Cameroon, published by ELECAM.",
    href: "https://portail.elecam.cm/download/code-electoral/",
    cta: "Open PDF",
    external: true,
  },
 
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

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ResourcesSection() {
  return (
    <section
      id="sec-resources"
      className={` relative w-full overflow-hidden pt-8`}
    >

      <div className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >

          <motion.h2
            variants={fadeUp}
            className="text-balance text-[clamp(2rem,1.6rem+2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight"
          >
            Laws & reference documents
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-pretty text-[clamp(0.95rem,0.88rem+0.35vw,1.15rem)] leading-relaxed text-[#1C1B18]/75 sm:mt-6"
          >
            Primary texts that govern local authorities and elections in Cameroon.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 flex flex-col overflow-hidden rounded-2xl border border-[#0B3B2E]/10 bg-[#FBF9F4] sm:mt-16"
        >
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <motion.li
                key={resource.id}
                variants={rowVariants}
                className="group border-b border-[#0B3B2E]/[0.08] last:border-b-0"
              >
                <a
                  href={resource.href}
                  target={resource.external ? "_blank" : undefined}
                  rel={resource.external ? "noopener noreferrer" : undefined}
                  onClick={
                    resource.href === "#" ? (e) => e.preventDefault() : undefined
                  }
                  className="flex flex-col gap-4 p-5 transition-colors hover:bg-[#B08D57]/[0.06] sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B3B2E]/[0.06] sm:mt-0">
                      <Icon
                        className="h-4 w-4 text-[#B08D57]"
                        strokeWidth={1.75}
                      />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[clamp(1rem,0.94rem+0.25vw,1.1rem)] font-semibold leading-snug ">
                        {resource.name}
                      </div>
                      <p className="mt-1 text-[clamp(0.82rem,0.78rem+0.15vw,0.9rem)] leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </div>

                  <span className="ml-13 flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[clamp(0.78rem,0.75rem+0.1vw,0.85rem)] font-medium text-[#0B3B2E] transition-colors group-hover:text-[#8B1E1E] sm:ml-6">
                    {resource.cta}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
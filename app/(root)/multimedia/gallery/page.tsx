"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { deputiesData } from "@/data";

interface Deputy {
  name: string;
  image: string; // e.g. "MBAPTE-Jean-Baptiste.jpg"
}

type Accent = "cream" | "white" | "gradient" | "gold" | "dark";

interface TeamMember {
  id: string;
  name: string;
  image: string; // full source URL
  sourceUrl: string; // where clicking the card should go
  accent: Accent;
}
const SOURCE_BASE = "https://www.assnat.cm/images/photosDepute/legislature10";

const ACCENT_CYCLE: Accent[] = ["cream", "white", "gradient", "gold", "white"];

const deputies = deputiesData as Deputy[];

const team: TeamMember[] = deputies.map((deputy, index) => {
  const imageUrl = `${SOURCE_BASE}/${deputy.image}`;
  return {
    id: deputy.image,
    name: deputy.name,
    image: imageUrl,
    sourceUrl: imageUrl,
    accent: ACCENT_CYCLE[index % ACCENT_CYCLE.length],
  };
});

const accentStyles: Record<Accent, string> = {
  cream: "bg-orange-50/90 ring-1 ring-orange-100",
  white: "bg-white/95 ring-1 ring-slate-100",
  gradient: "bg-gradient-to-r from-orange-100/90 to-rose-100/90 ring-1 ring-orange-200",
  gold: "bg-amber-100/90 ring-1 ring-amber-200",
  dark: "bg-slate-900 ring-1 ring-slate-800",
};

const textStyles: Record<Accent, { name: string }> = {
  cream: { name: "text-slate-900" },
  white: { name: "text-slate-900" },
  gradient: { name: "text-slate-900" },
  gold: { name: "text-slate-900" },
  dark: { name: "text-white" },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25 } },
};

export default function CurrentLegislatureSection() {
 
  const [activeFilter] = useState<"View all">("View all");

  const visibleMembers = activeFilter === "View all" ? team : team;

  return (
    <section className="w-full bg-[#f4f1ec] px-4 py-16 sm:px-6 md:py-28 lg:py-35">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingVariants}
          className="max-w-2xl text-center"
        >
          <h2 className="text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Current Legislature
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-500 sm:text-base">
            Members of the National Assembly of Cameroon.
          </p>
        </motion.div>

        <motion.div
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-10 grid w-full grid-cols-2 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {visibleMembers.map((member) => (
              <motion.a
                key={member.id}
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="group block"
                title={`Open source photo of ${member.name}`}
              >
                <div className="relative aspect-[3/3.4] w-full overflow-hidden rounded-2xl bg-slate-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-x-3 bottom-3 rounded-xl px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3 ${accentStyles[member.accent]}`}
                  >
                    <p className={`truncate text-sm font-semibold sm:text-base ${textStyles[member.accent].name}`}>
                      {member.name}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
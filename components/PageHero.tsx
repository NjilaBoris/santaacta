"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type PageHeroProps = {
  badgeIcon?: ReactNode;
  badgeLabel?: string;
  title: string;
  description?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  actions?: ReactNode;
  align?: "left" | "center";
};

export default function PageHero({
  badgeIcon,
  badgeLabel,
  title,
  description,
  imageSrc,
  imageAlt,
  priority = false,
  actions,
  align = "left",
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      className={`relative isolate w-full overflow-hidden rounded-2xl sm:rounded-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/45 to-neutral-950/10" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`flex min-h-[340px] flex-col justify-end gap-3 px-5 py-8 xs:min-h-[380px] sm:min-h-[420px] sm:gap-4 sm:px-10 sm:py-12 md:min-h-[460px] lg:min-h-[500px] lg:px-14 lg:py-16 ${
          align === "center" ? "items-center" : "items-start"
        }`}
      >
        {badgeLabel && (
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:text-sm"
          >
            {badgeIcon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{badgeIcon}</span>}
            {badgeLabel}
          </motion.span>
        )}

        <motion.h1
          variants={item}
          className="max-w-3xl text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.1] text-white"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={item}
            className="max-w-2xl text-[clamp(0.9375rem,1.8vw,1.125rem)] leading-relaxed text-white/85"
          >
            {description}
          </motion.p>
        )}

        {actions && (
          <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-3">
            {actions}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
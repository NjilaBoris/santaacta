"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Headphones } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function PodcastHero() {
  return (
    <section className="bg-[#F7F3EA] px-4 pb-8 pt-18 md:pt-24 lg:pt-38 sm:px-6 sm:pb-10 sm:pt-8 lg:px-10 lg:pb-14">
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#26A3DB] transition-colors hover:text-[#26A3DB]/70 sm:text-sm"
          >
            <ArrowLeft className="h-[15px] w-[15px] transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-4 sm:w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="relative mt-4 overflow-hidden rounded-2xl shadow-lg shadow-black/10 sm:mt-6 sm:rounded-3xl"
        >
          {/* Aspect-ratio box: taller on mobile, wide-banner on desktop */}
          <div className="relative aspect-[4/5] w-full xs:aspect-[16/12] sm:aspect-[16/8] lg:aspect-[16/6]">
            <Image
              src="/pimage.jpg"
              alt="Podcast recording setup with headphones and a studio microphone"
              fill
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />

            {/* Gradient overlay for legible text */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 xs:p-6 sm:p-8 lg:p-10">
              <motion.span
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
                className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm sm:mb-4 sm:px-3.5 sm:text-xs"
              >
                <Headphones className="h-3.5 w-3.5" />
                Listen &amp; watch
              </motion.span>

              <motion.h1
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
                className="font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 1.2rem + 2.5vw, 3.25rem)" }}
              >
                Podcasts
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={4}
                variants={fadeUp}
                className="mt-2 max-w-xl text-white/85 sm:mt-3"
                style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.4vw, 1rem)" }}
              >
                Watch our YouTube podcast episodes on parliamentary matters and governance.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
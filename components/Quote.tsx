"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";


type Stat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

const stats: Stat[] = [
  {
    id: "Council services",
    label: "Council services",
    value: 16,
    suffix: "",
  },
  {
    id: "Bureaux & offices",
    label: "Bureaux & offices",
    value: 15,
    suffix: "+",
  },
  {
    id: "Members of the Executive",
    label: "Members of the Executive",
    value: 4.2,
    suffix: "",
  },
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const numberRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10% 0px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !numberRef.current) return;
    hasAnimated.current = true;

    const target = { val: 0 };
    const el = numberRef.current;
    const decimals = stat.decimals ?? 0;

    gsap.to(target, {
      val: stat.value,
      duration: 1.4,
      delay: index * 0.12,
      ease: "power2.out",
      onUpdate: () => {
        const current =
          decimals > 0 ? target.val.toFixed(decimals) : Math.round(target.val);
        el.textContent = `${current}${stat.suffix ?? ""}`;
      },
    });
  }, [isInView, index, stat.decimals, stat.suffix, stat.value]);

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-[#FAF9F7] px-6 py-7 sm:px-7 sm:py-8 min-h-[180px] sm:min-h-[200px]"
    >
      <p className="text-xs sm:text-sm leading-snug text-neutral-400 max-w-[18ch]">
        {stat.label}
      </p>

      <div
        ref={numberRef}
        className="mt-6 sm:mt-8 font-medium tracking-tight text-neutral-900 tabular-nums text-[2.75rem] sm:text-5xl md:text-[3.25rem] leading-none"
      >
        0{stat.suffix ?? ""}
      </div>
    </motion.div>
  );
}

export default function StatsCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  return (
    <section className="w-full px-4 sm:px-6 py-10 sm:py-14">
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12 },
          },
        }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {stats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
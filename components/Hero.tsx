"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export type Slide = {
  image: string;
};

const SLIDES: Slide[] = [
  { image: "/7.jpg" },
  { image: "/8.jpg" },
  { image: "/9.jpg" },
  { image: "/6.jpg" },
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 20;

export default function HeroSlider({ slides = SLIDES }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || reduceMotion || count <= 1) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((cur) => (cur + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reduceMotion, count]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  const slide = slides[index];

  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir > 0 ? 40 : -40,
      scale: reduceMotion ? 1 : 1.04,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir > 0 ? -40 : 40,
      scale: reduceMotion ? 1 : 1.0,
    }),
  };

  return (
    <section className="w-full bg-[#F1EAE0] py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-stretch">
          {/* -------- Photo panel -------- */}
          <div
            className="relative order-1 h-[280px] w-full overflow-hidden rounded-3xl bg-[#151110] xs:h-[340px] sm:h-[420px] lg:order-2 lg:h-auto lg:min-h-[520px] xl:min-h-[600px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="ACTA hero"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.5, ease: "easeInOut" },
                  x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: reduceMotion ? 0 : 6, ease: "linear" },
                }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="pointer-events-none select-none object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prev}
                  className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#2b1c12] backdrop-blur-sm transition-colors hover:bg-white sm:h-10 sm:w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={next}
                  className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#2b1c12] backdrop-blur-sm transition-colors hover:bg-white sm:h-10 sm:w-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-sm sm:bottom-5 sm:gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === index}
                      onClick={() => goTo(i)}
                      className="relative flex h-2.5 w-4 items-center justify-center sm:h-3 sm:w-5"
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 sm:h-[7px] ${
                          i === index
                            ? "w-4 bg-white sm:w-5"
                            : "w-1.5 bg-white/50 hover:bg-white/80 sm:w-[7px]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* -------- Text panel -------- */}
          <div className="relative z-10 order-2 -mt-10 rounded-3xl bg-[#F1EAE0] px-1 pt-2 sm:px-2 lg:order-1 lg:-mr-16 lg:mt-0 lg:flex lg:max-w-none lg:flex-col lg:justify-end lg:rounded-none lg:bg-transparent lg:px-0 lg:pb-14 lg:pr-20">
            <div className="flex items-center gap-2.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#2b1c12]/70 sm:text-[11px]">
              Civic Technology &middot; Republic of Cameroon
            </div>

            <h1 className="mt-4 max-w-xl text-[clamp(2rem,1.3rem+3.2vw,3.2rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-[#2b1c12] sm:mt-5">
              Data driven
              <br />
              civic technology
              <br />
              for local governance
            </h1>

            <p className="mt-5 max-w-[46ch] text-[13.5px] leading-relaxed text-[#2b1c12]/70 sm:mt-6 sm:text-[15px] md:text-base">
              ACTA connects the people of Santa Subdivision with their Council  its
              departments, services, elected representatives and decisions  and opens direct
              channels to raise concerns, ask questions and take part in local governance.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-9">
             <Link
                href="/santa-council/council-department"
                className="inline-flex items-center gap-2 text-white bg-[#202D61] px-5 py-3 text-[13px] font-semibold transition-colors hover:bg-[#202D61]/80  sm:text-sm"
              >
                Explore Council Departments <span aria-hidden="true">&rarr;</span>
              </Link>

              <Link
                href="/engage/write-council"
                className="inline-flex items-center gap-2 border border-[#202D61]/70 px-5 py-3 text-[#2b1c12]/70 text-[13px] font-semibold  transition-colors hover:bg-[#202D61]/80 hover:text-[#2b1c12]/70 sm:text-sm"
              >
                Write to Your Councillor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
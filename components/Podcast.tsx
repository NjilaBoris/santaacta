"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";


interface Episode {
  id: string;
  title: string;
  description: string;
  image: string;
}

const heroImage =
  "/img4.jpg";

const episodes: Episode[] = [
  {
    id: "tech-tomorrow",
    title: "Tech Tomorrow",
    description:
      "Stay ahead of the curve with the latest advancements in technology. From AI breakthroughs to the future...",
    image:
      "/img1.jpeg",
  },
  {
    id: "culture-connect",
    title: "Culture Connect",
    description:
      "Explore the rich tapestry of global cultures in this podcast that takes you on a journey across continents...",
    image:
      "/img2.jpg",
  },
  {
    id: "green-voices",
    title: "The Green Voices",
    description:
      "Tune into the most pressing environmental issues of our time. From climate change to conservation...",
    image:
      "/img3.jpg",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PodcastSpotlight() {
  return (
    <section className="w-full  px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <motion.div
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1.65fr_1fr] lg:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={fadeIn}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]"
        >
          <Image
            src={heroImage}
            alt="Podcast host recording an episode at a desk with a microphone"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="flex flex-col rounded-2xl bg-white p-5 sm:p-6 lg:p-7"
        >
         
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-red-600" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-900 sm:text-base">
                Podcast
              </span>
            </div>
            <a
              href="#"
              className="group flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 sm:text-sm"
            >
              view all
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          <p className="mb-5 text-[clamp(0.9rem,0.8rem+0.4vw,1.05rem)] leading-relaxed text-slate-800 sm:mb-6">
            Dive into our Top 5 selection of the best podcasts, featuring
            everything from latest tech to trending tunes. Press the play
            button now!
          </p>

          <ul className="flex flex-col divide-y divide-slate-100">
            {episodes.map((episode) => (
              <motion.li
                key={episode.id}
                variants={fadeUp}
                className="group flex gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4 sm:py-4"
              >
                <a
                  href="#"
                  className="flex w-full gap-3 sm:gap-4"
                  aria-label={`Play episode: ${episode.title}`}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20">
                    <Image
                      src={episode.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[clamp(0.9rem,0.85rem+0.25vw,1rem)] font-semibold text-red-600 transition-colors group-hover:text-red-700">
                      {episode.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[clamp(0.78rem,0.72rem+0.3vw,0.875rem)] leading-snug text-slate-500">
                      {episode.description}
                    </p>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
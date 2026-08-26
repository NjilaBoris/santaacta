"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

export interface NewsArticle {
  id: string;
  category: string;
  date: string;
  title: string;
  image: string;
  href: string;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LatestNewsClient({
  articles,
}: {
  articles: NewsArticle[];
}) {
  if (articles.length === 0) {
    return null; // or a fallback/empty state
  }

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-center gap-4 sm:mb-8 md:gap-6">
          <div className="flex shrink-0 items-center gap-2">
            <span
              className="h-4 w-1 rounded-full bg-red-600"
              aria-hidden="true"
            />
            <h2 className="text-[clamp(1rem,0.9rem+0.4vw,1.15rem)] font-medium text-slate-900">
              Latest News
            </h2>
          </div>
          <span className="hidden h-px flex-1 bg-slate-200 sm:block" aria-hidden="true" />
            <Link  
            href="/news"
            className="group ml-auto flex shrink-0 items-center gap-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 sm:text-sm">
            view all
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {articles.map((article) => (
            <motion.a
              key={article.id}
              href={article.href}
              variants={fadeUp}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[clamp(0.72rem,0.68rem+0.15vw,0.8rem)] sm:mt-4">
                <span className="font-medium text-amber-700">
                  {article.category}
                </span>
                <span className="text-slate-400" aria-hidden="true">
                  ·
                </span>
                <span className="text-slate-500">{article.date}</span>
              </div>

              <h3 className="mt-1.5 text-[clamp(0.95rem,0.85rem+0.5vw,1.15rem)] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-red-700 sm:mt-2">
                {article.title}
              </h3>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Newspaper } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type NewsItem = {
  id: string;
  slug: string;
  date: string;
  title: string;
  href: string;
  image: string;
};

type NewsRow = {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NewsHero() {
  return (
    <section className="bg-[#F7F3EA] px-4 pb-8 pt-18 sm:px-6 sm:pb-10 sm:pt-8 md:pt-24 lg:px-10 lg:pb-14 lg:pt-38">
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#26A3DB] transition-colors hover:text-[#26A3DB]/70 sm:text-sm"
          >
            <ArrowLeft className="h-[15px] w-[15px] transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-4 sm:w-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="relative mt-4 overflow-hidden rounded-2xl shadow-lg shadow-black/10 sm:mt-6 sm:rounded-3xl"
        >
          <div className="relative aspect-[4/5] w-full xs:aspect-[16/12] sm:aspect-[16/8] lg:aspect-[16/6]">
            <Image
              src="/news1.jpg"
              alt="News image"
              fill
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 xs:p-6 sm:p-8 lg:p-10">
              <motion.span
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
                className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm sm:mb-4 sm:px-3.5 sm:text-xs"
              >
                <Newspaper className="h-3.5 w-3.5" />
                Latest News &amp; Updates
              </motion.span>

              <motion.h1
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
                className="font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 1.2rem + 2.5vw, 3.25rem)" }}
              >
                News
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={4}
                variants={fadeUp}
                className="mt-2 max-w-xl text-white/85 sm:mt-3"
                style={{ fontSize: "clamp(0.8125rem, 0.75rem + 0.4vw, 1rem)" }}
              >
                Stay updated with the latest news and developments in politics and governance.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index}
      variants={fadeUp}
    >
      <Link href={item.href} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-3 sm:mt-3.5">
          <span className="font-mono text-[11px] text-ink/50 sm:text-xs">{item.date}</span>
        </div>

        <h3
          className="mt-1.5 font-display font-semibold leading-snug tracking-tight text-[#1D4ED8] transition-colors duration-200 group-hover:text-[#1D4ED8]/75 sm:mt-2"
          style={{ fontSize: "clamp(0.95rem, 0.88rem + 0.3vw, 1.15rem)" }}
        >
          {item.title}
        </h3>
      </Link>
    </motion.article>
  );
}

function NewsGrid({ items, loading }: { items: NewsItem[]; loading: boolean }) {
  if (loading) {
    return (
      <section className="bg-[#F7F3EA] px-4 pb-16 pt-2 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] w-full rounded-xl bg-ink/10 sm:rounded-2xl" />
                <div className="mt-3 h-3 w-20 rounded bg-ink/10" />
                <div className="mt-2 h-5 w-full rounded bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-[#F7F3EA] px-4 pb-16 pt-2 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm text-ink/50">No news articles yet — check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F3EA] px-4 pb-16 pt-2 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {items.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i + 5} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from("news_posts")
        .select("id, title, slug, cover_image_url, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      if (cancelled) return;

      if (error) {
        console.error("Supabase news fetch error:", error);
        setItems([]);
      } else {
        const mapped = (data as NewsRow[]).map((row) => ({
          id: row.id,
          slug: row.slug,
          date: formatDate(row.created_at),
          title: row.title,
          href: `/news/${row.slug}`,
          image: row.cover_image_url ?? "/placeholder.jpg",
        }));
        setItems(mapped);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-[#F7F3EA]">
      <NewsHero />
      <NewsGrid items={items} loading={loading} />
    </main>
  );
}
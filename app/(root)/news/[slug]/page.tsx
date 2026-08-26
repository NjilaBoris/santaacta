"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

type NewsItem = {
  id: string;
  slug: string;
  date: string;
  title: string;
  image: string;
  content: string;
};

type NewsRow = {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string;
  created_at: string;
  content: { text?: string } | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from("news_posts")
        .select("id, title, slug, cover_image_url, created_at, content")
        .eq("slug", params.slug)
        .single();

      if (cancelled) return;

      if (error || !data) {
        if (error) console.error("Supabase news fetch error:", error);
        setNotFound(true);
      } else {
        const row = data as NewsRow;
        setItem({
          id: row.id,
          slug: row.slug,
          date: formatDate(row.created_at),
          title: row.title,
          image: row.cover_image_url,
          content: row.content?.text ?? "",
        });
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.slug]);

  if (loading) {
    return (
      <main className="bg-[#F7F3EA] px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-10 lg:pt-40">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-4 w-24 rounded bg-ink/10" />
          <div className="mt-6 aspect-[16/9] w-full rounded-2xl bg-ink/10 sm:rounded-3xl" />
          <div className="mt-6 h-4 w-32 rounded bg-ink/10" />
          <div className="mt-3 h-9 w-full rounded bg-ink/10" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-ink/10" />
            <div className="h-4 w-full rounded bg-ink/10" />
            <div className="h-4 w-2/3 rounded bg-ink/10" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !item) {
    return (
      <main className="bg-[#F7F3EA] px-4  pt-20 text-center">
        <p className="text-sm text-ink/60">This article couldn&apos;t be found.</p>
        <Link
          href="/news"
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#26A3DB] hover:text-[#26A3DB]/70 sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>
      </main>
    );
  }
  const paragraphs = item.content
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="bg-[#F7F3EA] px-4 pb-16 pt-18 sm:px-6 sm:pt-24 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/news"
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#26A3DB] transition-colors hover:text-[#26A3DB]/70 sm:text-sm"
        >
          <ArrowLeft className="h-[15px] w-[15px] transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-4 sm:w-4" />
          Back to News
        </Link>

        <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl sm:mt-6 sm:rounded-3xl">
          <Image src={item.image} alt={item.title} fill priority className="object-cover" />
        </div>

        <span className="mt-5 block font-mono text-[11px] text-ink/50 sm:mt-6 sm:text-xs">
          {item.date}
        </span>

        <h1
          className="mt-2 font-display font-bold leading-[1.1] tracking-tight text-ink"
          style={{ fontSize: "clamp(1.6rem, 1.2rem + 1.8vw, 2.5rem)" }}
        >
          {item.title}
        </h1>

        {paragraphs.length > 0 ? (
          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed text-ink/80"
                style={{ fontSize: "clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink/50 sm:mt-8">
            No article content available yet.
          </p>
        )}
      </div>
    </main>
  );
}
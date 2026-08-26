"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

export type Story = {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  href: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function PoliticsFeedClient({ stories }: { stories: Story[] }) {
  if (stories.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:px-12">
      <div className="mx-auto max-w-[88rem]">
        {/* -------- Header row -------- */}
        <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-4 sm:mb-6 sm:pb-5">
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-1 bg-red-600 sm:h-4.5" aria-hidden="true" />
            <h2 className="text-[15px] font-bold text-neutral-900 sm:text-base md:text-lg">Latest Blogs</h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-neutral-700 transition-colors hover:text-neutral-900 sm:text-sm"
          >
            View all
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-x-5 gap-y-8 xs:grid-cols-2 sm:gap-x-6 lg:grid-cols-3"
        >
          {stories.map((story) => (
            <motion.article key={story.id} variants={cardVariant}>
              <Link href={story.href} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-neutral-100">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-500 sm:text-[12px]">
                  <span className="font-medium text-neutral-600">{story.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{story.date}</span>
                </div>

                <h3 className="mt-1.5 line-clamp-3 text-[13.5px] font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-[15px] md:text-base">
                  {story.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
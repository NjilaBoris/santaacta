"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { FileText, Download } from "lucide-react";

const policies = [
  {
    image: { src: "/policy1.PNG", alt: "Privacy Policy document preview" },
    fileId: "1vcJzJR3YeyOxpCe-LTCk18kkeV8ddNDO",
  },
  {
    image: { src: "/policy2.PNG", alt: "Terms of Service document preview" },
    fileId: "1Q8iNawOm9o0ylNoEWFDqY8Hgw2SNdBZm",
  },
  {
    image: { src: "/policy3.PNG", alt: "Data Protection Policy document preview" },
    fileId: "1eDu8mC2qXiPbfrlZQgIJj9z01FMKFFfY",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function driveViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function driveDownloadUrl(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

interface PolicyShowcaseProps {
  heading?: string;
  description?: string;
}

export default function PolicyShowcase({
  heading = "Resources",
  description = "Primary documents and reference material governing the work of the National Assembly.",
}: PolicyShowcaseProps) {
  return (
    <section className="w-full py-16 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mx-auto flex max-w-5xl flex-col items-center gap-10"
      >
        <motion.div variants={textVariants} className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-balance text-slate-600">
            {description}
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {policies.map((policy) => (
            <motion.div
              key={policy.fileId}
              variants={cardVariants}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                <Image
                  src={policy.image.src}
                  alt={policy.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                

                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={driveViewUrl(policy.fileId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    View Policy
                  </a>

                  <a
                    href={driveDownloadUrl(policy.fileId)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
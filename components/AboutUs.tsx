"use client";

import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import { motion } from "framer-motion";

/**
 * About Us — ACTA / POLITICOS
 *
 * Design tokens
 * ─────────────
 * ink        #16233A   deep navy — primary dark surface & headline text
 * paper      #F5F1E6   warm parchment — primary light surface
 * verdigris  #4B7267   civic bronze-patina green — ACTA accent
 * ochre      #B8863B   muted brass — POLITICOS accent
 * charcoal   #23262B   body text on light surfaces
 * slate      #5B6270   secondary / muted text
 *
 * Fraunces (serif, display) carries the voice of the brand.
 * IBM Plex Sans (body/UI) — chosen for its institutional, multilingual
 * character, fitting a bilingual civic platform.
 */



function BroadcastMark() {
  // ACTA — a council building reached by information, radiating outward.
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-10 w-10"
      fill="none"
      aria-hidden="true"
    >
      <rect x="20" y="34" width="24" height="18" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M20 34 L32 24 L44 34" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M27 52 V40 M37 52 V40" stroke="currentColor" strokeWidth="2" />
      <path d="M40 18c4 2 6 5 6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 12c7 3 11 9 11 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EvidenceMark() {
  // POLITICOS — layered research findings examined closely.
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-10 w-10"
      fill="none"
      aria-hidden="true"
    >
      <rect x="14" y="12" width="26" height="34" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <path d="M20 21h14M20 28h14M20 35h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="42" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M48.5 48.5 L56 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HeroGraphic() {
  // Abstract network — citizens and institutions in conversation.
  const nodes = [
    { cx: 60, cy: 70, r: 5, fill: "#B8863B" },
    { cx: 150, cy: 40, r: 7, fill: "#4B7267" },
    { cx: 230, cy: 95, r: 4, fill: "#16233A" },
    { cx: 120, cy: 150, r: 9, fill: "#16233A" },
    { cx: 220, cy: 190, r: 5, fill: "#B8863B" },
    { cx: 60, cy: 210, r: 5, fill: "#4B7267" },
    { cx: 180, cy: 260, r: 6, fill: "#16233A" },
  ];
  const edges = [
    [0, 1], [1, 2], [1, 3], [3, 0], [3, 4], [3, 5], [4, 6], [5, 6],
  ];
  return (
    <svg viewBox="0 0 280 300" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#16233A"
          strokeOpacity="0.28"
          strokeWidth="1.5"
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} fillOpacity="0.9" />
      ))}
    </svg>
  );
}

const heroLines = ["About", "Acta."];

export default function AboutUs() {
  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-[#F5F1E6] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <p className="mb-5 text-sm font-medium text-[#5B6270]">About us</p>
            <h1 className=" text-[clamp(2.1rem,5.2vw,3.75rem)] leading-[1.08] tracking-tight text-[#16233A]">
              {heroLines.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="pl-3"
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6  text-base leading-relaxed text-[#5B6270] sm:text-lg"
            >
              ACTA is a civic technology initiative designed to make local governance more open, accessible, and responsive to the people of Santa Subdivision. It provides citizens with simplified information about the Santa Council, its elected representatives, committees, services, decisions, and development activities. Through digital tools, ACTA creates opportunities for residents to share their views, raise concerns, participate in surveys, and communicate with local authorities. By connecting information with citizen participation, ACTA seeks to foster greater public understanding, accountability, and constructive engagement in local governance.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className=" aspect-square w-full "
          >
            {/* <HeroGraphic /> */}
            <img src="/6.jpg" alt="Council services" className="h-full w-full rounded-2xl object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── Our approach ───────────────────────────────────── */}
      {/* <section className="bg-[#16233A] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <p className="text-sm font-medium text-[#B8863B]">Our approach</p>
          <div>
            <p className=" text-[clamp(1.5rem,3.2vw,2.5rem)] italic leading-snug text-[#F5F1E6]">
              We believe local governance works best when residents can see
              it, question it, and shape it.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F5F1E6]/70 sm:text-lg">
              ACTA and POLITICOS are two parts of the same commitment: one
              opens the Santa Council up to public view, the other builds the
              research and tools that make participation count.
            </p>
          </div>
        </motion.div>
      </section> */}

      {/* ── ACTA ───────────────────────────────────────────── */}
      {/* <section className="bg-[#F5F1E6] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-16"
        >
          <div className="flex flex-col items-start gap-4">
            <span className="text-[#4B7267]">
              <BroadcastMark />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[#16233A] sm:text-4xl">
                ACTA
              </h2>
              <p className="mt-1 text-sm text-[#4B7267]">
                Civic technology for Santa Subdivision
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-[#23262B] sm:text-lg">
            ACTA is a civic technology initiative designed to make local
            governance more open, accessible, and responsive to the people of
            Santa Subdivision. It provides citizens with simplified
            information about the Santa Council, its elected representatives,
            committees, services, decisions, and development activities.
            Through digital tools, ACTA creates opportunities for residents to
            share their views, raise concerns, participate in surveys, and
            communicate with local authorities. By connecting information
            with citizen participation, ACTA seeks to foster greater public
            understanding, accountability, and constructive engagement in
            local governance.
          </p>
        </motion.div>
      </section> */}

      {/* ── POLITICOS ──────────────────────────────────────── */}
      {/* <section className="bg-[#EDE6D4] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.4fr] lg:gap-16"
        >
          <p className="order-2 max-w-2xl text-base leading-relaxed text-[#23262B] sm:text-lg lg:order-1">
            The Policy Lab for Civic Innovation and Community Solutions
            (POLITICOS) is a problem-solving think tank dedicated to bridging
            the gap between evidence, governance, and citizen action. It
            develops evidence-based and citizen-centred solutions to complex
            governance and development challenges. Through the integration of
            research, civic technology, and participatory democracy,
            POLITICOS designs, tests, and scales practical approaches that
            strengthen accountability, improve institutional performance, and
            support sustainable development outcomes — grounded in the belief
            that effective governance requires informed citizens, responsive
            institutions, reliable evidence, and meaningful opportunities for
            people to participate in decisions that affect their communities.
          </p>
          <div className="order-1 flex flex-col items-start gap-4 lg:order-2 lg:items-end lg:text-right">
            <span className="text-[#B8863B]">
              <EvidenceMark />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-[#16233A] sm:text-4xl">
                POLITICOS
              </h2>
              <p className="mt-1 text-sm text-[#B8863B]">
                Policy Lab for Civic Innovation and Community Solutions
              </p>
            </div>
          </div>
        </motion.div>
      </section> */}
    </main>
  );
}
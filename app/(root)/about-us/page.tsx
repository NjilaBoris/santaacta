"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";


function Chamber({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-ink/10 py-12 sm:py-14 md:py-16"
    >
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12">
        <div className="flex items-start gap-3 md:flex-col md:items-start md:gap-4">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted sm:text-xs">
              {eyebrow}
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.5rem,1.1rem+1.8vw,2.25rem)] font-medium leading-[1.1] text-ink">
              {title}
            </h2>
          </div>
        </div>

        <p className="max-w-prose text-[clamp(0.95rem,0.88rem+0.35vw,1.125rem)] leading-relaxed text-ink/80">
          {body}
        </p>
      </div>
    </motion.section>
  );
}


export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-paper">
     
      <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-24 md:pt-28 lg:px-10">
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]  sm:text-xs">
                About Us
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Chamber
          eyebrow=""
          title="About ACTA"
          body="ACTA is a civic technology initiative designed to make local governance more open, accessible, and responsive to the people of Santa Subdivision. It provides citizens with simplified information about the Santa Council, its elected representatives, committees, services, decisions, and development activities.
Through digital tools, ACTA creates opportunities for residents to share their views, raise concerns, participate in surveys, and communicate with local authorities. By connecting information with citizen participation, ACTA seeks to foster greater public understanding, accountability, and constructive engagement in local governance."
        />

        <Chamber
          eyebrow=""
          title="POLITICOS"
          body="The Policy Lab for Civic Innovation and Community Solutions (POLITICOS) is a problem-solving think tank dedicated to bridging the gap between evidence, governance, and citizen action. It develops evidence-based and citizen-centred solutions to complex governance and development challenges.
Through the integration of research, civic technology, and participatory democracy, POLITICOS designs, tests, and scales practical approaches that strengthen accountability, improve institutional performance, and support sustainable development outcomes, grounded in the belief that effective governance requires informed citizens, responsive institutions, reliable evidence, and meaningful opportunities for people to participate in decisions that affect their communities."
        />
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:px-10">
        <div className="flex items-center gap-3 border-t border-ink/10 pt-8">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted sm:text-xs">
            Transparency · Accountability · Participation
          </p>
        </div>
      </div>
    </main>
  );
}
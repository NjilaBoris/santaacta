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
          title="About Parli Access"
          body="Parli Access is a civic technology platform that bridges the gap between citizens and the National Assembly of Cameroon by providing clear, reliable, and user-friendly parliamentary information in both English and French. The platform helps citizens understand the role and functioning of the National Assembly, access information about Members of Parliament and their constituencies, follow bills and legislative developments, and explore committee reports and other parliamentary resources — while promoting active participation through polls, public consultations, feedback mechanisms, and civic dialogue. By making parliamentary information more accessible and understandable, Parli Access strengthens transparency, accountability, and informed democratic participation in Cameroon."
        />

        <Chamber
          eyebrow=""
          title="About The People's Parliament"
          body="The People's Parliament is a civic engagement initiative committed to strengthening the connection between citizens and institutions in Cameroon. It promotes civic education, public dialogue, transparency, and accountable governance by creating accessible spaces for citizens to understand parliamentary and governance processes. Through community dialogues, youth engagement programmes, public discussions, and digital participation tools, the initiative encourages informed and constructive citizen participation in public affairs."
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
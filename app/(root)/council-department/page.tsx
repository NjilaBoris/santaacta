"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Scale,
  Landmark,
  Globe2,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  Package,
  FileSignature,
  Search,
  ArrowUpRight,
} from "lucide-react";

const GENERAL_COMMITTEES = [
  {
    seal: "1",
    name: "Constitutional Laws, Human Rights & Freedoms, Justice, Legislation & Standing Orders",
    holder: "Hon. Zondol Hersess",
    icon: Scale,
  },
  {
    seal: "2",
    name: "Finance & the Budget",
    holder: "Hon. Moutymbo Rosette Julienne épse Ayayi",
    icon: Landmark,
  },
  {
    seal: "3",
    name: "Foreign Affairs",
    holder: "Hon. Banmi Emmanuel Dingha",
    icon: Globe2,
  },
  {
    seal: "4",
    name: "National Defence & Security",
    holder: "Hon. Djibrilla Kaou",
    icon: ShieldCheck,
  },
  {
    seal: "5",
    name: "Economic Affairs, Planning & Regional Development",
    holder: "Hon. Mbe Assae Mendomo Théodore Alexandre",
    icon: TrendingUp,
  },
  {
    seal: "6",
    name: "Education, Vocational Training & Youth",
    holder: "Hon. Ngahane",
    icon: GraduationCap,
  },
  {
    seal: "7",
    name: "Cultural, Social & Family Affairs",
    holder: "Hon. Douvaouissa Aïssa Hamadi",
    icon: HeartHandshake,
  },
  {
    seal: "8",
    name: "Production & Trade",
    holder: "Hon. Mbakam Chouga Guillaume",
    icon: Package,
  },
  {
    seal: "9",
    name: "Resolutions & Petitions",
    holder: "Hon. Tak Bienvenu",
    icon: FileSignature,
  },
];

const NETWORKS = [
  { no: "01", name: "REPAR-CEFDHAC", focus: "Central African Forest Ecosystems", coordinator: "Hon. Zam Jean Jacques" },
  { no: "02", name: "REJE", focus: "Hope & Youth Network", coordinator: "Hon. Joshua Osih" },
  { no: "03", name: "REPICOP", focus: "Investment & Partnership Contracts", coordinator: "Hon. Banmi Emmanuel Dingha" },
  { no: "04", name: "REP-COD", focus: "Diaspora & Decentralized Cooperation", coordinator: "Hon. Louis Henri Ngantcha" },
  { no: "05", name: "Promo-Entrepreneuriat", focus: "Private Entrepreneurship", coordinator: "Hon. Roger Melingui" },
  { no: "06", name: "REPATIC", focus: "Telecommunications & ICT", coordinator: "Hon. Bara Julien" },
  { no: "07", name: "Women Members of the National Assembly", focus: "Women's Parliamentary Caucus", coordinator: "Hon. Koa Mfegue Laurentine" },
  { no: "08", name: "REPARC", focus: "Disaster Risk Reduction", coordinator: "Hon. Emah Etoundi" },
  { no: "09", name: "REPRODHOCY", focus: "Human Rights & Cybersecurity", coordinator: "Hon. Zondol Herssesse" },
  { no: "10", name: "Racine de Vie", focus: "Malnutrition Prevention", coordinator: "Hon. Emah Etoundi" },
  { no: "11", name: "Legis-Securoute", focus: "Road Safety", coordinator: "Hon. Donald Malomba Esembe" },
  { no: "12", name: "APNODE Cameroon Chapter", focus: "Development Evaluation", coordinator: "Hon. Ndongo Elise" },
  { no: "13", name: "Oxygène", focus: "Anti-Tobacco", coordinator: "Hon. Ngalle Daniel" },
  { no: "14", name: "PADEV-CAM", focus: "Sustainable Development Goals", coordinator: "Hon. Njume Peter Ambang" },
  { no: "15", name: "REP-SIAP", focus: "Informal & Agropastoral Sector Support", coordinator: "Hon. Salmana Amadou" },
  { no: "16", name: "Répa-Banque Mondiale / FMI", focus: "World Bank / IMF Liaison", coordinator: "Hon. Aliyoum Fadil" },
  { no: "17", name: "International Association of Parliamentarians for Peace", focus: "International Peace Cooperation", coordinator: "Hon. Emabot Brigitte" },
  { no: "18", name: "Insurance Promotion Network", focus: "Insurance Sector Development", coordinator: "Hon. Djeumeni Benilde" },
  { no: "19", name: "Social & Solidarity Economy", focus: "Cooperative & Solidarity Enterprise", coordinator: "Hon. Douvaouissa Aissa" },
  { no: "20", name: "Extractive Resources Governance", focus: "Mining & Resource Transparency", coordinator: "Hon. Prince Mikody Ange Gilbert" },
  { no: "21", name: "Population, Development & Public Health", focus: "Demographic & Health Policy", coordinator: "Hon. Ndoumou Pauline" },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
export default function CommitteesNetworks() {
  const [query, setQuery] = useState("");

  const filteredNetworks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NETWORKS;
    return NETWORKS.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.focus.toLowerCase().includes(q) ||
        n.coordinator.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="min-h-screen text-[#1B2A4A]">
      <section className="relative overflow-hidden border-b border-[#1B2A4A]/10 px-5 pb-14 pt-20 md:pt-24 sm:px-8 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-42">

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.35em]  sm:text-xs"
          >
            Office of the National Assembly
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4  text-[clamp(1.9rem,5vw+0.6rem,3.5rem)] font-semibold leading-[1.08] tracking-tight"
          >
            Committees &amp; Parliamentary
            <br className="hidden sm:block" /> Networks
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl text-[clamp(0.95rem,0.4vw+0.85rem,1.125rem)] leading-relaxed text-[#1B2A4A]/70"
          >
            Nine General Committees oversee legislative scrutiny by domain; twenty-one
            thematic Parliamentary Networks bring members together across party lines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-8  text-xs uppercase tracking-widest text-[#1B2A4A]/50"
          >
            <span>09 Committees</span>
            <span>21 Networks</span>
          </motion.div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-18 lg:py-20">
        <div className="mb-8 flex items-baseline justify-between gap-4 sm:mb-10">
          <h2 className="text-[clamp(1.35rem,1.6vw+0.9rem,1.9rem)] font-semibold tracking-tight">
            General Committees
          </h2>
          <span className="hidden text-xs uppercase tracking-widest text-[#1B2A4A]/40 sm:block">
            Standing bodies · IX
          </span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {GENERAL_COMMITTEES.map((c) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.seal}
                variants={item}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col rounded-2xl border border-[#1B2A4A]/10 bg-white/70 p-5 shadow-[0_1px_2px_rgba(27,42,74,0.04)] transition-colors hover:border-[#9C7A3C]/40 hover:bg-white sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B2A4A]/5 text-[#9C7A3C] transition-colors group-hover:bg-[#9C7A3C]/10">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs tracking-widest text-[#1B2A4A]/30">
                    {c.seal}
                  </span>
                </div>

                <h3 className="text-[15px] font-semibold leading-snug tracking-tight sm:text-base">
                  {c.name}
                </h3>

                <p className="mt-3 border-t border-[#1B2A4A]/8 pt-3 text-sm text-[#1B2A4A]/65">
                  {c.holder}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </section>
      <section className="border-t border-[#1B2A4A]/10  px-5 py-14  sm:px-8 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[clamp(1.35rem,1.6vw+0.9rem,1.9rem)] font-semibold tracking-tight">
                Parliamentary Networks
              </h2>
              <p className="mt-2 max-w-md text-sm ">
                Twenty-one thematic caucuses, register 01–21, coordinated across party
                lines.
              </p>
            </div>

            <label className="relative w-full sm:w-72">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the register…"
                className="w-full rounded-full border border-black py-2.5 pl-10 pr-4 text-sm placeholder:text-[#FAF7F0]/35 outline-none transition-colors focus:border-[#9C7A3C]/60 focus:bg-[#FAF7F0]/10"
              />
            </label>
          </div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="divide-y divide-[#FAF7F0]/10 rounded-2xl border border-[#FAF7F0]/10"
          >
            {filteredNetworks.map((n) => (
              <motion.li
                key={n.no}
                variants={item}
                className="group grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-1 px-4 py-4 transition-colors hover:bg-[#FAF7F0]/[0.04] sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-x-6 sm:px-6"
              >
                <span className="font-mono text-xs  sm:text-sm">
                  {n.no}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium leading-snug sm:text-base">
                    {n.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs  sm:text-sm">
                    {n.focus}
                  </p>
                </div>

                <div className="col-span-2 mt-2 flex items-center justify-between text-xs  sm:col-span-1 sm:mt-0 sm:justify-end sm:text-sm">
                  <span className="truncate">{n.coordinator}</span>
                  <ArrowUpRight
                    className="ml-3 h-4 w-4 flex-shrink-0  transition-colors group-hover:text-[#9C7A3C]/70"
                    strokeWidth={1.75}
                  />
                </div>
              </motion.li>
            ))}

            {filteredNetworks.length === 0 && (
              <li className="px-6 py-10 text-center text-sm ">
                No network matches “{query}”.
              </li>
            )}
          </motion.ul>
        </div>
      </section>

      <section className="px-5 py-10 text-center sm:px-8">
        <p className="mx-auto max-w-xl text-sm text-[#1B2A4A]/50">
          Committee reports are available as a searchable archive by session and date.
        </p>
      </section>
    </main>
  );
}
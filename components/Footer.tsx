"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";


type FooterLink = { label: string; href: string };
type FooterGroup = { heading: string; links: FooterLink[] };

const FOOTER_GROUPS: FooterGroup[] = [
  {
    heading: "National Assembly",
    links: [
      { label: "History of the National Assembly", href: "/national-assembly/history" },
      { label: "Functioning of the National Assembly", href: "/national-assembly/functioning" },
      { label: "Organization", href: "/national-assembly/organization" },
    ],
  },
  {
    heading: "Engage & Explore",
    links: [
      { label: "Write to Your MP", href: "/engage/mp" },
      { label: "Polls", href: "/engage/polls" },
      { label: "Podcast", href: "/multimedia/podcast" },
      { label: "Gallery", href: "/multimedia/gallery" },
      { label: "Parliamentary Dashboard", href: "/parli-dashboard" },
    ],
  },
];

const SITE_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  {label: "Resources", href: "/resources"},
  { label: "News & Update", href: "/news" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Committees & Network", href: "/committees-&-network" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];


function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21.75v-8.1h2.72l.41-3.15h-3.13V8.49c0-.91.25-1.53 1.56-1.53h1.67V4.14A22.4 22.4 0 0 0 14.33 4c-2.4 0-4.05 1.47-4.05 4.16v2.32H7.55v3.15h2.73v8.1z" />
    </svg>
  );
}

export default function Footer() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <footer className="w-full border-t border-white/10 bg-[#151110]">
      <div className="mx-auto max-w-[110rem] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_2.8fr] lg:gap-14">
          <div>
            <Link href="/" className="inline-block select-none">
              <Image src="/parliicon.svg" alt="PARLI ACCESS" className="h-18 w-auto object-contain  lg:h-20" width={100} height={105} />
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#c9c2bd] sm:text-[13.5px]">
              A civic technology platform bridging citizens and the National Assembly of Cameroon
               an initiative of The People&apos;s Parliament.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on X"
                className="text-[#c9c2bd] transition-colors hover:text-white"
              >
                <XMark className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Facebook"
                className="text-[#c9c2bd] transition-colors hover:text-white"
              >
                <FacebookMark className="h-4 w-4" />
              </a>
            </div>
          </div>

         
          <div className="hidden grid-cols-2 gap-8 lg:grid">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white">
                  {group.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#c9c2bd] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10 lg:hidden">
            {FOOTER_GROUPS.map((group) => {
              const isOpen = openGroup === group.heading;
              return (
                <div key={group.heading}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup((cur) => (cur === group.heading ? null : group.heading))}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-[13.5px] font-semibold uppercase tracking-[0.05em] text-white sm:text-sm"
                  >
                    {group.heading}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#948d89] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-col gap-3 pb-4 pl-1">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-[13px] text-[#c9c2bd] transition-colors hover:text-white"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* -------- Site links row -------- */}
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
          {SITE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12.5px] font-medium text-[#c9c2bd] transition-colors hover:text-white sm:text-[13px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* -------- Bottom bar -------- */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11.5px] text-[#948d89] sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-8 sm:text-xs">
          <p>&copy; {new Date().getFullYear()} Parli Access &mdash; An initiative of The People&apos;s Parliament, Cameroon.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X as CloseIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IconCurrentLocation } from "@tabler/icons-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "News & Update", href: "/news" },
  {
    label: "Santa Council",
    href: "/santa-council",
    submenu: [
      { label: "Council Departments", href: "/santa-council/council-department" },
      { label: "Council Services", href: "/santa-council/council-services" },
      { label: "Executive & Leadership", href: "/santa-council/executive-&-leadership" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Councillors & Committes",
    href: "/council-&-committes",
  },
  {
    label: "Multimedia",
    href: "/multimedia",
    submenu: [
      { label: "Gallery", href: "/multimedia/gallery" },
    ],
  },
  {
    label: "Engage",
    href: "/engage",
    submenu: [
      { label: "Write to your MP", href: "/engage/write-council" },
      { label: "Polls", href: "/engage/polls" },
    ],
  },
  { label: "Governance Dashboard", href: "/gorvernance-dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

function useLocation() {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_name}`);
        } else {
          setLocation(null);
        }
      })
      .catch(() => setLocation(null));
  }, []);

  return location;
}

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

export default function Navbar() {
  const pathname = usePathname();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSubOpen, setDrawerSubOpen] = useState<string | null>(null);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerSubOpen(null);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full fixed border-b z-44 border-white/10 bg-[#151110]">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Open search"}
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#c9c2bd] transition-colors hover:text-white sm:h-9 sm:w-9"
            >
              {searchOpen ? (
                <CloseIcon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              ) : (
                <Search className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              )}
            </button>

            <span className="hidden h-4 w-px bg-white/15 lg:hidden sm:block" aria-hidden="true" />

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="flex h-8 w-8 items-center lg:hidden justify-center rounded-full text-[#c9c2bd] transition-colors hover:text-white sm:h-9 sm:w-9"
            >
              <Menu className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
            </button>
          </div>

          <Link
            href="/"
            onClick={closeDrawer}
            className="absolute left-1/2 -translate-x-1/2 select-none"
          >
            <Image
              src="/actalogo1.svg"
              alt="PARLI ACCESS"
              className="h-13 w-auto object-contain lg:h-13"
              width={100}
              height={105}
            />
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on X"
              className="hidden text-[#c9c2bd] transition-colors hover:text-white xs:inline-flex"
            >
              <XMark className="h-[15px] w-[15px] sm:h-4 sm:w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Facebook"
              className="hidden text-[#c9c2bd] transition-colors hover:text-white xs:inline-flex"
            >
              <FacebookMark className="h-[15px] w-[15px] sm:h-4 sm:w-4" />
            </a>

            <span className="hidden h-4 w-px bg-white/15 xs:block" aria-hidden="true" />

            <button
              type="button"
              aria-label="Location"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#c9c2bd] transition-colors hover:text-white sm:h-9 sm:w-9"
            >
              <span className="text-sm">
                {location ?? (
                  <IconCurrentLocation className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                )}
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pb-3">
                <input
                  autoFocus
                  type="search"
                  placeholder="Search the archive, bills, members…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-[#948d89] outline-none focus:border-white/25 sm:text-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="relative border-t border-white/10">
          <ul
            className="scrollbar-none lg:flex hidden items-center gap-5 overflow-x-auto whitespace-nowrap py-3 sm:gap-7 sm:py-3.5 lg:gap-8 lg:overflow-visible"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li
                  key={link.label}
                  className="relative shrink-0"
                  onMouseEnter={() => {
                    setHovered(link.label);
                    if ("submenu" in link && link.submenu) setOpenMenu(link.label);
                  }}
                  onMouseLeave={() => {
                    if ("submenu" in link && link.submenu) setOpenMenu(null);
                  }}
                >
                  <Link
                    href={link.href}
                    className={`lg:flex items-center hidden gap-1 py-1 text-[11.5px] transition-colors xs:text-xs sm:text-[13px] lg:text-[13.5px] ${
                      active ? "text-[#26A3DB]" : "text-[#c9c2bd] hover:text-white"
                    }`}
                  >
                    {link.label}
                    {"submenu" in link && link.submenu && (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          openMenu === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {(active || hovered === link.label) && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#26A3DB] sm:-bottom-[14px]"
                    />
                  )}

                  {"submenu" in link && link.submenu && (
                    <AnimatePresence>
                      {openMenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#1c1716] shadow-2xl shadow-black/40 sm:w-80"
                        >
                          <div className="p-2">
                            {link.submenu.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                              >
                                <p className="text-[13px] font-medium text-white sm:text-[14px]">
                                  {item.label}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#151110] to-transparent lg:hidden" />
        </nav>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/60"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-sm flex-col bg-[#151110] shadow-2xl sm:w-96"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="absolute left-1/2 -translate-x-1/2 select-none"
                >
                  <Image
                    src="/actalogo1.svg"
                    alt="PARLI ACCESS"
                    className="h-13 w-auto object-contain lg:h-13"
                    width={100}
                    height={105}
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeDrawer}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#c9c2bd] hover:text-white"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-2">
                <ul className="flex flex-col gap-0.5">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      {"submenu" in link && link.submenu ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setDrawerSubOpen((cur) => (cur === link.label ? null : link.label))
                            }
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[14px] text-[#c9c2bd] transition-colors hover:bg-white/5 hover:text-white sm:text-[15px]"
                          >
                            {link.label}
                            <ChevronDown
                              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                                drawerSubOpen === link.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {drawerSubOpen === link.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-0.5 py-1 pl-4">
                                  {link.submenu.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={closeDrawer}
                                      className="rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                                    >
                                      <p className="text-[13px] font-medium text-white sm:text-[13.5px]">
                                        {item.label}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeDrawer}
                          className={`block rounded-lg px-3 py-3 text-[14px] transition-colors hover:bg-white/5 sm:text-[15px] ${
                            isActive(link.href) ? "text-white" : "text-[#c9c2bd] hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 px-5 py-4">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
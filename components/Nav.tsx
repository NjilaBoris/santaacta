"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X as CloseIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IconCurrentLocation } from "@tabler/icons-react";
import { NAV_LINKS } from "@/navlinks";
import { FacebookMark, XMark } from "@/icons";

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

function useNow() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

export default function Navbar() {
  const pathname = usePathname();
  const location = useLocation();
  const now = useNow();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSubOpen, setDrawerSubOpen] = useState<string | null>(null);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerSubOpen(null);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between sm:h-[4.5rem]">
          {/* Left: mobile menu button + logo + desktop nav */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-black lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" onClick={closeDrawer} className="flex select-none items-center">
              <Image
                src="/actalogo1.svg"
                alt="ACTA"
                className="h-8 w-auto object-contain sm:h-9"
                width={100}
                height={40}
              />
            </Link>

            <ul
              className="hidden items-center gap-7 lg:flex"
              onMouseLeave={() => setOpenMenu(null)}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                const hasSubmenu = "submenu" in link && Boolean(link.submenu);
                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasSubmenu) setOpenMenu(link.label);
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 py-1 text-[14px] transition-colors ${
                        active
                          ? "font-semibold text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {link.label}
                      {hasSubmenu && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            openMenu === link.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {"submenu" in link && link.submenu && (
                      <AnimatePresence>
                        {openMenu === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-black/[0.08] sm:w-96"
                          >
                            <p className="px-5 pt-5 text-[13px] font-medium text-black/45">
                              {link.label}
                            </p>
                            <div className="p-3 pt-2">
                              {link.submenu.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-start gap-3.5 rounded-xl px-2 py-3 transition-colors hover:bg-gray-50"
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-[#151110]">
                                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                                  </span>
                                  <span className="min-w-0">
                                    <p className="text-[13.5px] font-semibold text-[#151110] sm:text-sm">
                                      {item.label}
                                    </p>
                                    <p className="mt-0.5 text-[12.5px] leading-snug text-black/45">
                                      {item.description}
                                    </p>
                                  </span>
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
          </div>

          {/* Right: utility icons */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span
              suppressHydrationWarning
              className="hidden items-center whitespace-nowrap text-[11px] font-medium tabular-nums text-gray-500 transition-colors hover:text-black sm:flex sm:text-xs"
            >
              {now &&
                now.toLocaleString(undefined, {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
            </span>

            <span className="hidden h-4 w-px bg-gray-200 sm:block" aria-hidden="true" />

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on X"
              className="hidden text-gray-500 transition-colors hover:text-black xs:inline-flex"
            >
              <XMark className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Facebook"
              className="hidden text-gray-500 transition-colors hover:text-black xs:inline-flex"
            >
              <FacebookMark className="h-4 w-4" />
            </a>

            <span className="hidden h-4 w-px bg-gray-200 xs:block" aria-hidden="true" />

            <button
              type="button"
              aria-label="Location"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-black"
            >
              <span suppressHydrationWarning className="text-sm">
                {location ?? <IconCurrentLocation className="h-[18px] w-[18px]" />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/30"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-sm flex-col bg-white shadow-2xl sm:w-96"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <Link href="/" onClick={closeDrawer} className="select-none">
                  <Image
                    src="/actalogo1.svg"
                    alt="ACTA"
                    className="h-8 w-auto object-contain"
                    width={100}
                    height={40}
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeDrawer}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:text-black"
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
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[14px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-black sm:text-[15px]"
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
                                <div className="flex flex-col gap-0.5 py-1 pl-2">
                                  {link.submenu.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={closeDrawer}
                                      className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50"
                                    >
                                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-[#151110]">
                                        <item.icon className="h-4 w-4" strokeWidth={1.75} />
                                      </span>
                                      <span className="min-w-0">
                                        <p className="text-[13px] font-medium text-black sm:text-[13.5px]">
                                          {item.label}
                                        </p>
                                        <p className="mt-0.5 text-[11.5px] leading-snug text-black/45">
                                          {item.description}
                                        </p>
                                      </span>
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
                          className={`block rounded-lg px-3 py-3 text-[14px] transition-colors hover:bg-gray-50 sm:text-[15px] ${
                            isActive(link.href) ? "font-semibold text-black" : "text-gray-600 hover:text-black"
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-100 px-5 py-4">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on X"
                  className="text-gray-500 transition-colors hover:text-black"
                >
                  <XMark className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Facebook"
                  className="text-gray-500 transition-colors hover:text-black"
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
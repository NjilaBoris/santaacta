import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/navlinks";
import { FacebookMark, XMark } from "@/icons";
const flatLinks = NAV_LINKS.filter((link) => !("submenu" in link) || !link.submenu);
const submenuGroups = NAV_LINKS.filter(
  (link): link is Extract<(typeof NAV_LINKS)[number], { submenu: readonly unknown[] }> =>
    "submenu" in link && Boolean(link.submenu)
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-neutral-100">
      <div className="mx-auto max-w-[110rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block select-none">
              <Image
                src="/actalogo1.svg"
                alt="ACTA"
                className="h-9 w-auto object-contain"
                width={100}
                height={40}
              />
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-gray-500 sm:text-sm">
              ACTA connects residents of Santa with their local council — news, services,
              departments, and a direct line to elected representatives.
            </p>

            <div className="mt-6 flex items-center gap-4">
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
          </div>

          {/* Explore: flat top-level links */}
          <div>
            <p className="text-[13px] font-medium text-black/45">Explore</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {flatLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-500 transition-colors hover:text-black sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* One column per submenu group (Santa Council, Multimedia, Engage) */}
          {submenuGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[13px] font-medium text-black/45">{group.label}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link
                    href={group.href}
                    className="text-[13px] text-gray-500 transition-colors hover:text-black sm:text-sm"
                  >
                    Overview
                  </Link>
                </li>
                {group.submenu.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-gray-500 transition-colors hover:text-black sm:text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-gray-400 sm:text-[13px]">
            © {year} ACTA — Santa Council. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-[12px] text-gray-400 transition-colors hover:text-black sm:text-[13px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[12px] text-gray-400 transition-colors hover:text-black sm:text-[13px]"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
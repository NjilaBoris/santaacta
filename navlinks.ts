import {
  Building2,
  ClipboardList,
  Users,
  Image as ImageIcon,
  Mail,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type SubmenuItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "News & Update", href: "/news" },
  {
    label: "Santa Council",
    href: "/santa-council",
    submenu: [
      {
        label: "Council Departments",
        href: "/santa-council/council-department",
        description: "The bureaus and offices that run day-to-day council business.",
        icon: Building2,
      },
      {
        label: "Council Services",
        href: "/santa-council/council-services",
        description: "Permits, registrations, and the services residents can request.",
        icon: ClipboardList,
      },
      {
        label: "Executive & Leadership",
        href: "/santa-council/executive-&-leadership",
        description: "Meet the Mayor, councillors, and the council's leadership team.",
        icon: Users,
      },
    ] satisfies SubmenuItem[],
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Multimedia",
    href: "/multimedia",
    submenu: [
      {
        label: "Gallery",
        href: "/multimedia/gallery",
        description: "Photos from council events, projects, and community life in Santa.",
        icon: ImageIcon,
      },
    ] satisfies SubmenuItem[],
  },
  {
    label: "Engage",
    href: "/engage",
    submenu: [
      {
        label: "Write to your MP",
        href: "/engage/write-council",
        description: "Send a message directly to your Mayor or Councillor.",
        icon: Mail,
      },
      {
        label: "Polls",
        href: "/engage/polls",
        description: "Share your view on local issues through open community polls.",
        icon: BarChart3,
      },
    ] satisfies SubmenuItem[],
  },
  { label: "Governance Dashboard", href: "/gorvernance-dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
] as const;
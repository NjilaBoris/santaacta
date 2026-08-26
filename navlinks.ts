export const NAV_LINKS = [
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
    label: "Multimedia",
    href: "/multimedia",
    submenu: [{ label: "Gallery", href: "/multimedia/gallery" }],
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
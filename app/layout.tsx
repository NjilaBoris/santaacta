import type { Metadata } from "next";
import { Bricolage_Grotesque, } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const SITE_URL = "https://sanctaacata.com";
const SITE_NAME = "ACTA";
const SITE_TITLE = "ACTA — Civic Technology for Santa Subdivision, Cameroon";
const SITE_DESCRIPTION =
  "ACTA is a civic technology platform for Santa Subdivision, Cameroon. Explore Santa Council departments and services, find your Councillor, track committees, register births, marriages and deaths, apply for building permits, report market or sanitation issues, take part in polls, and write directly to your Mayor or Councillor.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | ACTA",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ACTA",
    "Santa Council",
    "Santa Subdivision",
    "Santa Cameroon",
    "civic technology Cameroon",
    "local governance Cameroon",
    "participatory governance",
    "Santa Council departments",
    "civil status registry Santa",
    "birth certificate Santa Council",
    "marriage registration Cameroon",
    "death declaration Cameroon",
    "building permit Santa",
    "demolition permit Cameroon",
    "market management Santa",
    "hygiene and sanitation Santa Council",
    "Santa Councillors",
    "council committees Cameroon",
    "write to your Mayor",
    "write to your Councillor",
    "local governance dashboard",
    "Cameroon local council services",
    "POLITICOS",
    "The People's Parliament",
  ],
  authors: [{ name: "POLITICOS — Policy Lab for Civic Innovation and Community Solutions" }],
  creator: "POLITICOS",
  publisher: "POLITICOS",
  category: "Government",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ACTA — Data-Driven Civic Technology for Participatory Local Governance in Santa Subdivision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: "/actalogo1.svg",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolageGrotesque.className,)}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
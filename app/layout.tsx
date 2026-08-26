import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santa Acta",
  description: "A civic technology platform bridging citizens and the National Assembly of Cameroon, an initiative of The People's Parliament.",
  icons: "/actalogo1.svg"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, bricolageGrotesque.className, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

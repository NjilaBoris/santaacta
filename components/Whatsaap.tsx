"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "237683362966";
const WHATSAPP_MESSAGE = "Hello ACTA, I'd like to get in touch.";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.687 4.68 1.878 6.598L3 29l7.086-2.34a12.42 12.42 0 0 0 5.915 1.507h.005c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3Zm0 22.71h-.004a10.35 10.35 0 0 1-5.28-1.448l-.379-.225-3.923 1.295 1.318-3.822-.247-.393a10.32 10.32 0 0 1-1.586-5.517c0-5.71 4.647-10.357 10.361-10.357 2.767 0 5.368 1.078 7.325 3.036a10.29 10.29 0 0 1 3.032 7.325c0 5.71-4.646 10.106-10.617 10.106Zm5.671-7.586c-.31-.155-1.834-.905-2.119-1.008-.284-.104-.492-.155-.699.155-.207.31-.802 1.008-.984 1.215-.181.207-.362.233-.673.078-.31-.155-1.31-.483-2.495-1.539-.922-.822-1.545-1.837-1.727-2.147-.181-.31-.02-.478.136-.633.14-.14.31-.362.465-.543.155-.181.207-.31.31-.518.104-.207.052-.388-.026-.543-.078-.155-.699-1.685-.958-2.308-.252-.605-.508-.523-.699-.533l-.596-.01c-.207 0-.543.078-.828.388-.284.31-1.086 1.061-1.086 2.588 0 1.527 1.112 3.003 1.267 3.21.155.207 2.19 3.344 5.307 4.69.741.32 1.319.511 1.77.654.744.237 1.42.203 1.955.123.596-.089 1.834-.75 2.093-1.474.259-.724.259-1.344.181-1.474-.077-.13-.284-.207-.594-.362Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#20bd5a] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50" />
      <WhatsAppGlyph className="h-7 w-7 sm:h-8 sm:w-8" />
    </motion.a>
  );
}
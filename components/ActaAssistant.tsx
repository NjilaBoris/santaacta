import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function ActaAssistantFab() {
  return (
    <Link
      href="/acta-ai"
      aria-label="Open ACTA Assistant"
      className="group fixed bottom-4 left-4 z-50 flex flex-row-reverse items-center gap-0 rounded-full border border-[#243a6b] bg-[#0b1226] py-2 pl-2 pr-2 shadow-lg shadow-black/40 transition-all hover:gap-2 hover:pl-4 sm:bottom-6 sm:left-6 sm:py-2.5 sm:pl-2.5 sm:pr-2.5 sm:hover:pl-5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F3064]/15 sm:h-10 sm:w-10 md:h-11 md:w-11">
        <Sparkles
          className="h-4 w-4 text-[#1F3064] sm:h-5 sm:w-5"
          strokeWidth={2}
        />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[clamp(0.75rem,2vw,0.9375rem)] font-semibold text-[#eef1f8] opacity-0 transition-all duration-200 group-hover:max-w-[10rem] group-hover:opacity-100">
        ACTA Assistant
      </span>
    </Link>
  );
}
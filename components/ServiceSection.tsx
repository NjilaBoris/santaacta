import { ServiceSection } from "@/serverdata";
import { ContentBlockRenderer } from "./Block";


export function ServiceSectionBlock({ section }: { section: ServiceSection }) {
  return (
    <section id={section.id} className="mt-14 scroll-mt-24 first:mt-0 sm:mt-16">
      <div className="flex items-baseline gap-3">
        <h2 className="font-display text-[clamp(1.3rem,1.15rem+0.6vw,1.75rem)] font-medium text-forest-dark">
          {section.title}
        </h2>
      </div>
      <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
        {section.blocks.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </div>
    </section>
  )
}
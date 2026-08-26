import { ServiceSectionBlock } from "@/components/ServiceSection";
import { ServicesTabs } from "@/components/Servicetab";
import { services, servicesIntro } from "@/serverdata";


export default function ServicesPage() {
  return (
    <main className="flex-1 pb-8">
      <header className="pt-8 md:pt-18">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
            {servicesIntro.eyebrow}
          </span>
          <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,1.6rem+2vw,3.25rem)] font-medium leading-[1.05] text-forest-dark">
            {servicesIntro.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(0.95rem,0.9rem+0.2vw,1.1rem)] leading-relaxed text-ink-soft">
            {servicesIntro.description}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <ServicesTabs sections={services} />

        <div className="py-14 sm:py-18">
          {services.map((section) => (
            <ServiceSectionBlock key={section.id} section={section} />
          ))}
        </div>
      </div>
    </main>
  )
}
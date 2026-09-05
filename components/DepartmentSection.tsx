import { AccordionItem } from "@/components/Faq";
import { Department } from "@/council";
import { FileText } from "lucide-react";
import PageHero from "./PageHero";


export function DepartmentSection({ department, index }: { department: Department; index: number }) {
  return (
    <section id={department.id} className="mt-14 scroll-mt-24 first:mt-0 sm:mt-16">
              <PageHero 
              imageSrc={department.img} 
              imageAlt="Council Departments" 
              description={department.description}
              title={department.title}
              priority
              badgeIcon={<FileText />}
              />
      {/* <div className="flex items-baseline gap-3">
        <h2 className="font-display text-[clamp(1.3rem,1.15rem+0.6vw,1.75rem)] font-medium text-forest-dark">
          {department.title}
        </h2>
      </div> */}
      {/* <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">
        {department.description}
      </p> */}
      <div className="mt-6 divide-y divide-line rounded-md border border-line bg-paper-raised">
        {department.bureaus.map((bureau, i) => (
          <AccordionItem key={bureau.title} bureau={bureau} defaultOpen={index === 0 && i === 0} />
        ))}
      </div>
    </section>
  )
}
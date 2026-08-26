import { DepartmentsNav } from '@/components/DepartmentNav'
import { DepartmentSection } from '@/components/DepartmentSection'
import { departments } from '@/council'


export default function DepartmentsPage() {
  return (
    <main className="flex-1 pb-8">
      <header className="lg:pt-32 pt-8 md:pt-18">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex items-center gap-3 text-forest">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
              Council Departments
            </span>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(2rem,1.6rem+2vw,3.25rem)] font-medium leading-[1.05] text-forest-dark">
            Departments &amp; specialised services
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(0.95rem,0.9rem+0.2vw,1.1rem)] leading-relaxed text-ink-soft">
            The Santa Council is organised into six services, each responsible for specific areas of local
            administration and community development.
          </p>
        </div>
      </header>

      <div className="">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
          <DepartmentsNav departments={departments} />

          {departments.map((department, i) => (
            <DepartmentSection key={department.id} department={department} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
'use client'

import { Department } from '@/council'
import { motion } from 'framer-motion'

export function DepartmentsNav({ departments }: { departments: Department[] }) {
  return (
    <nav aria-label="Departments index" className="mb-10 sm:mb-12">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {departments.map((dept, i) => (
          <li key={dept.id}>
            <motion.a
              href={`#${dept.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.1 }}
              whileHover={{ y: -2 }}
              className="flex h-full flex-col rounded-sm border border-line bg-paper-raised px-3 py-3 transition-colors hover:border-forest/40"
            >
              <span className="mt-1 text-[12.5px] font-medium leading-snug text-ink">{dept.title}</span>
            </motion.a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
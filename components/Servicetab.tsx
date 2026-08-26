'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ServiceSection } from '@/serverdata'


export function ServicesTabs({ sections }: { sections: ServiceSection[] }) {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="sticky top-0 z-20 -mx-5   bg-paper/90 px-5 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-3 sm:gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="relative flex-shrink-0 border border-neutral-300 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-2 sm:text-sm"
          >
            {active === s.id && (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 rounded-full bg-forest"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className={`relative z-10 ${active === s.id ? 'text-paper' : 'text-ink-soft'}`}>
               {s.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
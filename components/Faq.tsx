'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Bureau } from '@/council';


export function AccordionItem({ bureau, defaultOpen = false }: { bureau: Bureau; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `panel-${bureau.title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span className="font-display text-sm font-medium leading-snug text-forest-dark sm:text-base">
          {bureau.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-ink-soft"
        >
          <ChevronDown size={17} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 text-sm leading-relaxed text-ink-soft sm:px-5">
              <p>{bureau.description}</p>

              {bureau.offices && (
                <div className="mt-3">
                  <p className="text-xs  uppercase font-bold tracking-wide text-ink-soft/80">Offices</p>
                  <ul className="mt-1.5 space-y-1">
                    {bureau.offices.map((office) => (
                      <li key={office} className="flex gap-2">
                        <span className="text-gold">{" "}</span>
                        <span>{office}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {bureau.services && (
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-soft/80">Key services</p>
                  <ul className="mt-1.5 space-y-1">
                    {bureau.services.map((service) => (
                      <li key={service} className="flex  gap-2">
                        <span className="text-forest text-center flex">{" "}</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
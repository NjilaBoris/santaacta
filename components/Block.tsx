'use client'

import { ContentBlock } from '@/serverdata'
import { motion } from 'framer-motion'
import { ReportForm } from './ReportForm'


export function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === 'intro') {
    return <p className="max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-[15px]">{block.text}</p>
  }

  if (block.type === 'info-cards') {
    return (
      <div className="space-y-6">
        {block.cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-md border border-line bg-paper-raised p-5 sm:p-6"
          >
            <h3 className="font-display text-base font-medium text-forest-dark sm:text-lg">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.description}</p>
            {card.rows && (
              <div className="mt-4 space-y-3 border-t border-line pt-4">
                {card.rows.map((row) => (
                  <div key={row.label}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">{row.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{row.description}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  if (block.type === 'dash-list') {
    return (
      <div className="rounded-md border border-line bg-paper-raised p-5 sm:p-6">
        {block.title && (
          <h3 className="font-display mb-4 text-base font-medium text-forest-dark sm:text-lg">{block.title}</h3>
        )}
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
              <span className="text-gold">{" "}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {block.note && <p className="mt-4 text-xs italic text-ink-soft/80">{block.note}</p>}
      </div>
    )
  }

  if (block.type === 'steps') {
    return (
      <div className="rounded-md border border-line bg-paper-raised p-5 sm:p-6">
        <h3 className="font-display mb-4 text-base font-medium text-forest-dark sm:text-lg">{block.title}</h3>
        <ol className="space-y-4">
          {block.steps.map((step) => (
            <li key={step.number} className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest text-xs font-medium text-paper">
                {" "}
              </span>
              <span className="text-sm leading-relaxed text-ink-soft">{step.text}</span>
            </li>
          ))}
        </ol>
        {block.note && <p className="mt-4 text-xs italic text-ink-soft/80">{block.note}</p>}
      </div>
    )
  }

  if (block.type === 'plain-list') {
    return (
      <div className="rounded-md border border-line bg-paper-raised p-5 sm:p-6">
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forest" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {block.note && <p className="mt-4 text-xs italic text-ink-soft/80">{block.note}</p>}
      </div>
    )
  }

  if (block.type === 'report-form') {
    return <ReportForm />
  }

  return null
}
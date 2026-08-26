'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ReportForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <div className="rounded-md border border-line bg-paper-raised p-5 sm:p-6">
      <h3 className="font-display text-base font-medium text-forest-dark sm:text-lg">Report a market issue</h3>
      <p className="mt-1 text-sm text-ink-soft">
        Noticed a problem in a market in Santa? Send a report to the relevant authorities.
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-md border-l-2 border-forest bg-forest-tint/40 px-4 py-3 text-sm text-forest-dark"
          >
            Thank you — your report has been received.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Full name
              </label>
              <input
                required
                placeholder="Enter your full name"
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-forest"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-forest"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-forest"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Market / location
              </label>
              <input
                required
                placeholder="Enter the market or locality"
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-forest"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-soft">
                Details
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe the issue. You may attach a photo or relevant document."
                className="w-full rounded-md border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-forest"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
              >
                {loading ? 'Submitting…' : 'Submit report'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
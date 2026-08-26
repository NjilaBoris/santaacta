'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Pencil, Search, PlayCircle } from 'lucide-react'
import { deletePodcast } from '@/lib/actions/podcast'


type Podcast = {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  youtube_link: string
  duration: string | null
  episode_number: number | null
  published: boolean
  created_at: string
}

export function PodcastsTable({ podcasts }: { podcasts: Podcast[] }) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState(podcasts)
  const [isPending, startTransition] = useTransition()

  const filtered = items.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))

  const handleDelete = (id: string) => {
    if (!confirm('Delete this podcast episode? This cannot be undone.')) return
    startTransition(async () => {
      await deletePodcast(id)
      setItems((prev) => prev.filter((p) => p.id !== id))
    })
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search episodes..."
            className="w-full rounded-full border border-ink/10 bg-paper py-2 pl-9 pr-4 text-sm outline-none focus:border-signal"
          />
        </div>
        <Link
          href="/admin/podcasts/new"
          className="rounded-full bg-ink px-4 py-2 text-center text-sm text-paper-white"
        >
          + New episode
        </Link>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 sm:hidden">
        <AnimatePresence>
          {filtered.map((podcast) => (
            <motion.div
              key={podcast.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg border border-ink/10 bg-paper-white p-3"
            >
              <div className="flex gap-3">
                {podcast.cover_image_url ? (
                  <img src={podcast.cover_image_url} alt="" className="h-16 w-16 flex-shrink-0 rounded-md object-cover" />
                ) : (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-paper text-slate-300">
                    <PlayCircle size={22} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {podcast.episode_number ? `EP ${podcast.episode_number} — ` : ''}
                    {podcast.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-slate-400">{podcast.duration ?? '—'}</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
                      podcast.published ? 'bg-wire/10 text-wire' : 'bg-slate-400/10 text-slate-600'
                    }`}
                  >
                    {podcast.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/admin/podcasts/${podcast.id}/edit`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-ink/10 py-1.5 text-xs"
                >
                  <Pencil size={12} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(podcast.id)}
                  disabled={isPending}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-signal/30 py-1.5 text-xs text-signal"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-ink/10 sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper font-mono text-[10px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Episode</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((podcast) => (
                <motion.tr key={podcast.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t border-ink/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {podcast.cover_image_url ? (
                        <img src={podcast.cover_image_url} alt="" className="h-10 w-10 rounded-md object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-paper text-slate-300">
                          <PlayCircle size={18} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-ink">
                          {podcast.episode_number ? `EP ${podcast.episode_number} — ` : ''}
                          {podcast.title}
                        </p>
                        {podcast.description && (
                          <p className="line-clamp-1 text-xs text-slate-500">{podcast.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{podcast.duration ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
                        podcast.published ? 'bg-wire/10 text-wire' : 'bg-slate-400/10 text-slate-600'
                      }`}
                    >
                      {podcast.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(podcast.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/podcasts/${podcast.id}/edit`} className="rounded-md p-1.5 text-slate-600 hover:bg-ink/5">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => handleDelete(podcast.id)} disabled={isPending} className="rounded-md p-1.5 text-signal hover:bg-signal/5">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-400">No podcast episodes yet.</p>}
      </div>
    </div>
  )
}
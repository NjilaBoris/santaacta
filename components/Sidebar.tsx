'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Newspaper, FileText, Users, Podcast, Menu, X, BarChart3 } from 'lucide-react'
import { LogoutButton } from './LogOut'
import Image from 'next/image'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/news', label: 'News Posts', icon: Newspaper },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/polls', label: 'Polls', icon: BarChart3 },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active ? 'bg-ink text-paper-white' : 'text-slate-600 hover:bg-ink/5 hover:text-ink'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar (lg and up) */}
      <aside className="fixed inset-y-0 left-0  hidden w-64 flex-col border-r border-ink/10 bg-paper-white px-4 py-6 lg:flex">
        <div className="mb-8 px-2">
           <Image src="/actalogo1.svg" alt="ACTA" className="h-16 w-auto object-contain  lg:h-18" width={100} height={105} />
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-400">Admin</p>
        </div>
        <NavLinks />
        <div className="mt-auto border-t border-ink/10 pt-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile / tablet topbar (below lg) */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-paper-white px-4 py-3 lg:hidden">
        <span className="font-display text-xl italic text-ink">Dispatch</span>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-1.5 text-ink transition-colors hover:bg-ink/5"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col bg-paper-white px-4 py-6 shadow-2xl lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between px-2">
                <span className="font-display text-2xl italic text-ink">Dispatch</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-md p-1.5 text-ink transition-colors hover:bg-ink/5"
                >
                  <X size={20} />
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
              <div className="mt-auto border-t border-ink/10 pt-4">
                <LogoutButton />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
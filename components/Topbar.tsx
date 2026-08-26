import { Search, Bell } from 'lucide-react'
import { LogoutButton } from './LogOut';

export function Topbar({ profile }: { profile: { display_name: string | null; role: string } | null }) {
  return (
    <header className="hidden items-center justify-between border-b border-ink/10 bg-paper-white px-6 py-4 lg:flex">
      <div className="relative w-full max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search posts, users..."
          className="w-full rounded-full border border-ink/10 bg-paper py-2 pl-9 pr-4 text-sm outline-none focus:border-signal"
        />
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="text-slate-600 hover:text-ink">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center bg-red-200 justify-center rounded-full bg-ink font-mono text-xs text-paper-white">
            {(profile?.display_name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
              {profile?.role ?? 'admin'}
            </p>
          </div>
          <LogoutButton/>
        </div>
      </div>
    </header>
  )
}
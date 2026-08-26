'use client'

import { updateUserRole } from '@/lib/user';
import { useTransition } from 'react'

type Profile = { id: string; display_name: string | null; role: string; created_at: string }

export function UsersTable({ users }: { users: Profile[] }) {
  const [isPending, startTransition] = useTransition()

  const toggleRole = (id: string, currentRole: string) => {
    const next = currentRole === 'admin' ? 'user' : 'admin'
    if (!confirm(`Change role to ${next}?`)) return
    startTransition(() => updateUserRole(id, next as 'user' | 'admin'))
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-ink/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-paper font-mono text-[10px] uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Joined</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-ink/5">
              <td className="px-4 py-3 font-medium text-ink">{user.display_name ?? 'Unnamed'}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
                    user.role === 'admin' ? 'bg-signal/10 text-signal' : 'bg-slate-400/10 text-slate-600'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => toggleRole(user.id, user.role)}
                  disabled={isPending}
                  className="rounded-md border border-ink/10 px-3 py-1 text-xs hover:bg-ink/5"
                >
                  {user.role === 'admin' ? 'Revoke admin' : 'Make admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-signal/5 hover:text-signal disabled:opacity-50"
    >
      <LogOut size={16} />
      {loading ? 'Signing out…' : 'Log out'}
    </button>
  )
}
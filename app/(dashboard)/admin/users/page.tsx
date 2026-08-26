import { UsersTable } from '@/components/UserTable'
import { createClient } from '@/lib/supabase/server'


export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: users } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Users</h1>
      <UsersTable users={users ?? []} />
    </div>
  )
}
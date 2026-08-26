import { PollsTable } from '@/components/polls/poll-table'
import { createClient } from '@supabase/supabase-js'

async function getPollResults() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabaseAdmin.from('poll_summary').select('*')

  if (error) {
    console.error('Failed to load poll summary:', error.message)
    return []
  }

  return data ?? []
}

export default async function AdminPollsPage() {
  const results = await getPollResults()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Polls</h1>
        <p className="mt-1 text-sm text-slate-500">
          Which issue should receive greater attention in Santa?
        </p>
      </div>
      <PollsTable results={results} />
    </div>
  )
}
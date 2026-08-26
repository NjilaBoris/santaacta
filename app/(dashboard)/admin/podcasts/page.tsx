import { PodcastsTable } from '@/components/podcasts/podasts-table'
import { createClient } from '@supabase/supabase-js'


async function getPodcasts() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data, error } = await supabaseAdmin
    .from('podcasts')
    .select('*')
    .order('episode_number', { ascending: false, nullsFirst: false })

  if (error) {
    console.error('Failed to load podcasts:', error.message)
    return []
  }
  return data
}

export default async function AdminPodcastsPage() {
  const podcasts = await getPodcasts()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Podcasts</h1>
      <PodcastsTable podcasts={podcasts} />
    </div>
  )
}
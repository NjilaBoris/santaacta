import { redirect } from 'next/navigation'
import { StatsCards } from '@/components/Stat'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
   const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const [{ count: blogCount }, { count: newsCount }, { count: userCount }, { count: publishedBlog },{ count: podcastCount }, { data: pollData }] =
    await Promise.all([
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('news_posts').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
      supabaseAdmin.from('poll_summary').select('vote_count'),
      supabaseAdmin.from('podcasts').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('podcasts').select('*', { count: 'exact', head: true }).eq('published', true),
    ])
    const totalPollVotes = (pollData ?? []).reduce((sum, row) => sum + (row.vote_count ?? 0), 0)

  const stats = [
    { label: 'Blog posts', value: String(blogCount ?? 0) },
    { label: 'News stories', value: String(newsCount ?? 0) },
    { label: 'Total users', value: String(userCount ?? 0) },
    { label: 'Published blog posts', value: String(publishedBlog ?? 0) },
    { label: 'Poll votes', value: String(totalPollVotes) },
    { label: 'Podcast episodes', value: String(podcastCount ?? 0) },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of your blog and news content.</p>
      </div>
      <StatsCards stats={stats} />
    </div>
  )
}
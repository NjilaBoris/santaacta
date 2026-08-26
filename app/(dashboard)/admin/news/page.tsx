import { PostsTable } from '@/components/PostTable'
import { deleteNewsPost } from '@/lib/actions/news-post'
import { createClient } from '@/lib/supabase/server'

export default async function AdminNewsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('news_posts').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">News stories</h1>
      <PostsTable posts={posts ?? []} basePath="news" onDelete={deleteNewsPost} />
    </div>
  )
}
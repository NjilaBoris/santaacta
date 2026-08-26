import { PostsTable } from '@/components/PostTable'
import { deleteBlogPost } from '@/lib/actions/blog-post'
import { createClient } from '@/lib/supabase/server'


export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Blog posts</h1>
      <PostsTable posts={posts ?? []} basePath="blog" onDelete={deleteBlogPost} />
    </div>
  )
}
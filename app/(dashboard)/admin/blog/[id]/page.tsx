import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Pencil, ArrowLeft } from 'lucide-react'

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-ink"
      >
        <ArrowLeft size={14} /> Back to blog posts
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{post.title}</h1>
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
              post.published ? 'bg-wire/10 text-wire' : 'bg-slate-400/10 text-slate-600'
            }`}
          >
            {post.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <Button >
          <Link href={`/admin/blog/${post.id}/edit`}>
            <Pencil size={14} className="mr-1.5" /> Edit
          </Link>
        </Button>
      </div>

      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt=""
          className="aspect-video w-full rounded-lg border border-ink/10 object-cover"
        />
      )}

      {post.excerpt && (
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Excerpt</h2>
          <p className="mt-2 text-sm text-ink">{post.excerpt}</p>
        </div>
      )}

      {post.content?.text && (
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Content</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{post.content.text}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 text-sm">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Created</p>
          <p className="mt-1 text-ink">{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
        {post.updated_at && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Updated</p>
            <p className="mt-1 text-ink">{new Date(post.updated_at).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}
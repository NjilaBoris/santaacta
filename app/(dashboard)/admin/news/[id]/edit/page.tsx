import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NewsPostForm } from '@/components/News/Form'


export default async function EditNewsPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Edit story</h1>
        <p className="mt-1 text-sm text-slate-500">Update details for this news story.</p>
      </div>
      <NewsPostForm post={post} />
    </div>
  )
}
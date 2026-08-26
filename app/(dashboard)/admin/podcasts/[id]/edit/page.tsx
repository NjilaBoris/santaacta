import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PodcastForm } from '@/components/podcasts/podcasts-form'


export default async function EditPodcastPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: podcast, error } = await supabase
    .from('podcasts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !podcast) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Edit episode</h1>
        <p className="mt-1 text-sm text-slate-500">Update details for &quot;{podcast.title}&quot;.</p>
      </div>
      <PodcastForm podcast={podcast} />
    </div>
  )
}
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Pencil, ArrowLeft } from 'lucide-react'

export default async function PodcastDetailPage({
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

  const youtubeEmbedUrl = getYoutubeEmbedUrl(podcast.youtube_link)

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        href="/admin/podcasts"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-ink"
      >
        <ArrowLeft size={14} /> Back to podcasts
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
            {podcast.episode_number ? `EP ${podcast.episode_number} — ` : ''}
            {podcast.title}
          </h1>
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
              podcast.published ? 'bg-wire/10 text-wire' : 'bg-slate-400/10 text-slate-600'
            }`}
          >
            {podcast.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <Button>
          <Link href={`/admin/podcasts/${podcast.id}/edit`}>
            <Pencil size={14} className="mr-1.5" /> Edit
          </Link>
        </Button>
      </div>

      {youtubeEmbedUrl ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-ink/10">
          <iframe
            src={youtubeEmbedUrl}
            title={podcast.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        podcast.cover_image_url && (
          <img
            src={podcast.cover_image_url}
            alt=""
            className="aspect-video w-full rounded-lg border border-ink/10 object-cover"
          />
        )
      )}

      {podcast.description && (
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Description</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{podcast.description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 text-sm sm:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Duration</p>
          <p className="mt-1 text-ink">{podcast.duration ?? '—'}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Created</p>
          <p className="mt-1 text-ink">{new Date(podcast.created_at).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">YouTube</p>
          <a
            href={podcast.youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-signal hover:underline"
          >
            View on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    let videoId: string | null = null

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1)
    } else if (parsed.hostname.includes('youtube.com')) {
      videoId = parsed.searchParams.get('v')
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  } catch {
    return null
  }
}
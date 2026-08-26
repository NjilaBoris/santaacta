'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createPodcast, updatePodcast } from '@/lib/actions/podcast'


type PodcastFormProps = {
  podcast?: {
    id: string
    title: string
    description: string | null
    youtube_link: string
    duration: string | null
    episode_number: number | null
    published: boolean
    cover_image_url: string | null
  }
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Saving…' : isEdit ? 'Update episode' : 'Create episode'}
    </Button>
  )
}

export function PodcastForm({ podcast }: PodcastFormProps) {
  const isEdit = !!podcast
  const action = isEdit ? updatePodcast.bind(null, podcast.id) : createPodcast
  const [state, formAction] = useActionState(action, null)

  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cover">Cover image</Label>
        <Input id="cover" name="cover" type="file" accept="image/*" />
        {podcast?.cover_image_url && (
          <img
            src={podcast.cover_image_url}
            alt=""
            className="mt-2 h-32 w-32 rounded-md object-cover"
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={podcast?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="episode_number">Episode number</Label>
          <Input
            id="episode_number"
            name="episode_number"
            type="number"
            min={1}
            defaultValue={podcast?.episode_number ?? ''}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={podcast?.description ?? ''}
          rows={5}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="youtube_link">YouTube link</Label>
          <Input
            id="youtube_link"
            name="youtube_link"
            type="url"
            defaultValue={podcast?.youtube_link}
            placeholder="https://youtube.com/watch?v=..."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            defaultValue={podcast?.duration ?? ''}
            placeholder="42:15"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={podcast?.published}
          className="h-4 w-4"
        />
        <Label htmlFor="published" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <SubmitButton isEdit={isEdit} />
    </form>
  )
}
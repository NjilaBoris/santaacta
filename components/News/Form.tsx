'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createNewsPost, updateNewsPost } from '@/lib/actions/news-post'

type NewsPostFormProps = {
  post?: {
    id: string
    title: string
    excerpt: string | null
    content: { text?: string }
    published: boolean
    cover_image_url: string | null
  }
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Saving…' : isEdit ? 'Update story' : 'Publish story'}
    </Button>
  )
}

export function NewsPostForm({ post }: NewsPostFormProps) {
  const isEdit = !!post
  const action = isEdit ? updateNewsPost.bind(null, post.id) : createNewsPost
  const [state, formAction] = useActionState(action, null)

  return (
    <form action={formAction} className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Headline</Label>
        <Input id="title" name="title" defaultValue={post?.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Story</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post?.content?.text ?? ''}
          rows={12}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover">Cover image</Label>
        <Input id="cover" name="cover" type="file" accept="image/*" />
        {post?.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt=""
            className="mt-2 aspect-video w-full rounded-md object-cover"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={post?.published}
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
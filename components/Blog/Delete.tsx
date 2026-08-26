'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { deleteBlogPost } from '@/lib/actions/blog-post'

export function DeleteBlogPostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    startTransition(async () => {
      await deleteBlogPost(id)
    })
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deleting…' : 'Delete'}
    </Button>
  )
}
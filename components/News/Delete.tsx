'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { deleteNewsPost } from '@/lib/actions/news-post'

export function DeleteNewsPostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this news post? This cannot be undone.')) return
    startTransition(async () => {
      await deleteNewsPost(id)
    })
  }

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deleting…' : 'Delete'}
    </Button>
  )
}
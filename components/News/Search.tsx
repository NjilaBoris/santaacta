'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { searchNewsPosts } from '@/lib/actions/news-post'

export function NewsSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()

  const handleChange = (value: string) => {
    setQuery(value)
    if (!value.trim()) {
      setResults([])
      return
    }
    startTransition(async () => {
      const data = await searchNewsPosts(value)
      setResults(data)
    })
  }

  return (
    <div className="relative">
      <Input
        placeholder="Search posts..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isPending && <p className="mt-1 text-sm text-muted-foreground">Searching…</p>}
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block px-4 py-2 hover:bg-muted"
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
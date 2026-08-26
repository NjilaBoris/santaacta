'use server'

import { createClient } from '@/lib/supabase/server'
import { uniqueSlug } from '@/lib/slugify'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type ActionState = { error?: string } | null

export async function createNewsPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be signed in.' }

  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string)?.trim()
  const published = formData.get('published') === 'on'
  const coverFile = formData.get('cover') as File

  if (!title) return { error: 'Title is required.' }
  if (!content) return { error: 'Content is required.' }

  let coverImageUrl: string | null = null
  if (coverFile && coverFile.size > 0) {
    const path = `${user.id}/${Date.now()}-${coverFile.name}`
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(path, coverFile)
    if (uploadError) return { error: `Image upload failed: ${uploadError.message}` }
    coverImageUrl = supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl
  }

  const { error } = await supabase.from('news_posts').insert({
    user_id: user.id,
    title,
    slug: uniqueSlug(title),
    content: { text: content },
    cover_image_url: coverImageUrl,
    published,
  })

  if (error) return { error: error.message }

  revalidatePath('/news')
  redirect('/news')
}

export async function updateNewsPost(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'You must be signed in.' }

  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string)?.trim()
  const published = formData.get('published') === 'on'
  const coverFile = formData.get('cover') as File

  if (!title) return { error: 'Title is required.' }

  const updates: Record<string, unknown> = {
    title,
    content: { text: content },
    published,
    updated_at: new Date().toISOString(),
  }

  if (coverFile && coverFile.size > 0) {
    const path = `${user.id}/${Date.now()}-${coverFile.name}`
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(path, coverFile)
    if (uploadError) return { error: `Image upload failed: ${uploadError.message}` }
    updates.cover_image_url = supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl
  }

  const { error } = await supabase.from('news_posts').update(updates).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/news')
  redirect('/news')
}

export async function deleteNewsPost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('news_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/news')
}

export async function searchNewsPosts(query: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('published', true)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
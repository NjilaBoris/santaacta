'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(id: string, role: 'user' | 'admin') {
  const supabase = await createClient()
  const { error } = await supabase.from('profiles').update({ role }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}
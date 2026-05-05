'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addProject(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const tech_stack = (formData.get('tech_stack') as string).split(',').map(s => s.trim()).filter(Boolean)
  const image_url = formData.get('image_url') as string || null
  const github_link = formData.get('github_link') as string || null
  const live_link = formData.get('live_link') as string || null
  const featured = formData.get('featured') === 'on'

  const { error } = await supabase.from('projects').insert({
    title,
    description,
    tech_stack,
    image_url,
    github_link,
    live_link,
    featured,
  })

  if (error) {
    console.error('Error inserting project:', error)
    redirect(`/admin/projects/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function deleteProject(id: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    redirect('/admin/projects?error=Failed+to+delete+project')
  }

  revalidatePath('/')
  revalidatePath('/admin/projects')
}

'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function submitContact(prevState: any, formData: FormData) {
  const email = (formData.get('email') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!email || !message) {
    return { error: 'Email and message are required.' }
  }

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.from('contacts').insert({ email, message })

  if (error) {
    console.error('Contact submission error:', error)
    return { error: 'Failed to send message. Please try again.' }
  }

  return { success: true }
}

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { Provider } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/sign-in?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function loginWithOAuth(provider: Provider) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const headerList = await headers()
  
  // Use the host header to construct the callback URL dynamically
  const host = headerList.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const callbackUrl = `${protocol}://${host}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl,
    },
  })

  if (error) {
    redirect('/sign-in?message=Could not authenticate with provider')
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signout() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/admin?message=Could not sign out')
  }

  revalidatePath('/', 'layout')
  redirect('/sign-in')
}

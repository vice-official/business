import { createClient as createSupabaseClient } from "@supabase/supabase-js"

let client: ReturnType<typeof createSupabaseClient> | null = null

const customStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null
    return window.localStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(key, value)

    try {
      const data = JSON.parse(value)
      if (data.access_token && data.refresh_token) {
        document.cookie = `sb-access-token=${data.access_token}; path=/; max-age=31536000; SameSite=Lax`
        document.cookie = `sb-refresh-token=${data.refresh_token}; path=/; max-age=31536000; SameSite=Lax`
      }
    } catch (e) {
      // If not JSON or missing tokens, clear cookies
      document.cookie = `sb-access-token=; path=/; max-age=0`
      document.cookie = `sb-refresh-token=; path=/; max-age=0`
    }
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(key)

    document.cookie = `sb-access-token=; path=/; max-age=0`
    document.cookie = `sb-refresh-token=; path=/; max-age=0`
  },
}

export function createClient() {
  if (client) return client

  client = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== "undefined" ? customStorage : undefined,
    },
  })

  return client
}

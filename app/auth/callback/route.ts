import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.session) {
      // Set cookies for the session
      const cookieStore = await cookies()
      cookieStore.set("sb-access-token", data.session.access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      cookieStore.set("sb-refresh-token", data.session.refresh_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`)
}

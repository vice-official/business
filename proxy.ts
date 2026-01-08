import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Get tokens from cookies
  const accessToken = request.cookies.get("sb-access-token")?.value
  const refreshToken = request.cookies.get("sb-refresh-token")?.value

  // Create Supabase client
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    },
  })

  let user = null

  // Try to get user from session
  if (accessToken && refreshToken) {
    try {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (!error && data.user) {
        user = data.user
      }
    } catch (error) {
      console.error("[v0] Middleware session error:", error)
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      const redirectUrl = new URL("/auth/login", request.url)
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user is admin
    try {
      const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", user.id).single()

      if (!profile || profile.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      console.error("[v0] Middleware profile check error:", error)
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/admin/:path*",
    // Exclude static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3)$).*)",
  ],
}

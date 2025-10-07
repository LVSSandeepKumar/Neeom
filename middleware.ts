import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const PUBLIC_PATHS = ["/admin/login", "/admin/signup", "/"]

// jose requires Uint8Array for secret
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/admin") &&
    !PUBLIC_PATHS.includes(pathname) &&
    !pathname.endsWith("/login") &&
    !pathname.endsWith("/signup")
  ) {
    console.log("✅ pathname is : ", pathname);

    const token = request.cookies.get("auth_token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      await jwtVerify(token, secret) // 👈 jose works in Edge runtime
      return NextResponse.next()
    } catch (e) {
      console.error("Invalid token: ", e)
      return NextResponse.redirect(new URL("/admin/signup", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

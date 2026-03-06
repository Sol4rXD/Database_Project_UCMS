import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedRoutes = ["/profile", "/editclub"];
const authRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname;
        const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
        const isAuthRoute = authRoutes.includes(path);

        const cookie = req.cookies.get("session")?.value;
        const session = cookie ? await decrypt(cookie).catch(() => null) : null;

        // 1. If trying to access a protected route without a session, redirect to login
        if (isProtectedRoute && !session) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }

        // 2. If trying to access auth routes (login/register) with a session, redirect to profile
        if (isAuthRoute && session) {
            return NextResponse.redirect(new URL("/profile", req.nextUrl));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

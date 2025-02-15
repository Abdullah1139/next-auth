import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || "";

    // Redirect logged-in users away from public routes
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Protect all private routes including '/profile' and '/profile/:id'
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// Protect both `/profile` and `/profile/:id`
export const config = {
    matcher: [
        '/',
        '/profile', 
        '/profile/:path*', // This ensures dynamic profile pages like /profile/[id] are also protected
        '/login',
        '/signup',
    ],
};

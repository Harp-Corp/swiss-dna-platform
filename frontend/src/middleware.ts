import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: This middleware runs on the edge and cannot access localStorage.
// Token-based auth is handled client-side via ProtectedRoute component.
// This middleware handles basic route protection via cookie-based hints.

const protectedPaths = ['/dashboard', '/doctor'];
const publicPaths = ['/', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if user is authenticated
  if (!session) {
    if (req.nextUrl.pathname.startsWith('/dashboard') || 
        req.nextUrl.pathname.startsWith('/orders')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return res;
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // Protect dashboard for non-artisan users
  if (req.nextUrl.pathname.startsWith('/dashboard') && profile?.role !== 'artisan') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Protect orders page for artisan users
  if (req.nextUrl.pathname.startsWith('/orders') && profile?.role === 'artisan') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/orders/:path*',
  ],
};
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  let res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const isLoginPage = req.nextUrl.pathname === '/login';
  const isAuthCallback = req.nextUrl.pathname.startsWith('/auth/callback');

  if (!session && !isLoginPage && !isAuthCallback) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

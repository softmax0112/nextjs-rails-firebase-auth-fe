import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { cookies, nextUrl, url } = req;
  const isLoggedIn = cookies.get('isLoggedIn');
  const isAuthUrl =
    nextUrl.pathname.startsWith('/signin') ||
    nextUrl.pathname.startsWith('/signup') ||
    nextUrl.pathname.startsWith('/auth-redirect');

  if (
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.startsWith('/api') ||
    nextUrl.pathname.startsWith('/static')
  )
    return NextResponse.next();

  // ログインしていなかったら「/signin」にリダイレクトさせる
  if (!isLoggedIn && !isAuthUrl) {
    return NextResponse.redirect(new URL('/signin', url));
  }

  // ログイン成功してたら「/signin, /signup」にはアクセスできない、前のURLにリダイレクトさせる
  if (isLoggedIn && isAuthUrl) {
    return NextResponse.redirect(new URL('/', url));
  }
}

import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { cookies, nextUrl, url } = req;
  const isLoggedIn = cookies.get('isLoggedIn');
  const isAuthUrl =
    nextUrl.pathname.includes('/signin') ||
    nextUrl.pathname.includes('/signup') ||
    nextUrl.pathname.includes('/auth-redirect');

  // ログインしていなかったら「/signin」にリダイレクトさせる
  if (!isLoggedIn && !isAuthUrl) {
    const baseURL = nextUrl.clone();
    return NextResponse.redirect(new URL('/signin', baseURL));
  }

  // ログイン成功してたら「/signin, /signup」にはアクセスできない、前のURLにリダイレクトさせる
  if (isLoggedIn && isAuthUrl) {
    return NextResponse.redirect(new URL('/', url));
  }
}

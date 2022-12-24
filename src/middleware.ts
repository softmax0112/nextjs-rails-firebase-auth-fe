import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const { cookies, nextUrl, url } = req;
  const isAuthenticated = cookies.get('isLoggedIn');
  const isAuthUrl =
    nextUrl.pathname.startsWith('/signin') ||
    nextUrl.pathname.startsWith('/signup') ||
    nextUrl.pathname.startsWith('/auth-redirect');

  if (
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.startsWith('/api') ||
    nextUrl.pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // ログインしていなかったら「/signin」にリダイレクトさせる
  if (!isAuthenticated && !isAuthUrl) {
    return NextResponse.redirect(new URL('/signin', url));
  }

  // ログイン成功してたら「/signin, /signup」にはアクセスできない、前のURLにリダイレクトさせる
  if (isAuthenticated && isAuthUrl) {
    return NextResponse.redirect(new URL('/', url));
  }
};

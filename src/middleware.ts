import { NextResponse, NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('loggedIn');
  const url = req.url;

  if (!verify && url.includes('/')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (verify && url === 'http://localhost:8080/') {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

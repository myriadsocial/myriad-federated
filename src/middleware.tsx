import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const getSession = request.cookies.get('session') ?? '';
    if (getSession) {
      const data = JSON.parse((getSession as string) ?? '');
      if (!data.apiURL || !data.token) {
        return NextResponse.redirect(new URL('/instance', request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

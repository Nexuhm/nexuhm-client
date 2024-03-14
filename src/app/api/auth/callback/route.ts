import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const secret = searchParams.get('secret');

  if (process.env.AUTH_CALLBACK_SECRET !== secret || !token) {
    return new Response('Error', {
      status: 403,
    });
  }

  const redirectUrl = new URL(
    '/admin',
    process.env.NEXT_PUBLIC_BASE_URL as string,
  );

  const response = NextResponse.redirect(redirectUrl, { status: 302 });

  response.cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    domain: process.env.AUTH_COOKIE_DOMAIN,
    maxAge: 60 * 60 * 24 * 1, // 1 week
  });

  return response;
}

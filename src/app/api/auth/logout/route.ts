import { NextResponse } from 'next/server';

export async function GET() {
  const redirectUrl = new URL(
    '/login',
    process.env.NEXT_PUBLIC_BASE_URL as string,
  );

  const response = NextResponse.redirect(redirectUrl, { status: 302 });

  // remove cookies by setting maxAge 0
  response.cookies.set('token', '', {
    path: '/',
    httpOnly: true,
    domain: process.env.AUTH_COOKIE_DOMAIN,
    maxAge: 0,
  });

  return response;
}

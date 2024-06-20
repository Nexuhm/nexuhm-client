import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function getCompanyBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/company/${slug}`,
  );

  return res.json();
}

function checkMatchMapping(pathname: string, mapping: Record<string, RegExp>) {
  return Object.values(mapping).some((value) => pathname.match(value));
}

function checkRewriteRule(pathname: string) {
  const negativeMatchMapping = {
    '/jobs': /jobs\//gi,
  };

  const isNegativeMatch = checkMatchMapping(pathname, negativeMatchMapping);

  if (isNegativeMatch) {
    return false;
  }

  const matchMapping = {
    '/': /\//,
  };

  return checkMatchMapping(pathname, matchMapping);
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') as string;
  const subdomain = host
    .replace(process.env.NEXT_PUBLIC_DOMAIN as string, '')
    .split('.')
    .at(0);

  //  bypass empty or www subdomain
  if (subdomain === 'www' || !subdomain) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const company = subdomain ? await getCompanyBySlug(subdomain) : null;

  // map company pages to subdomain
  if (company) {
    const isRewrite = checkRewriteRule(pathname);

    if (isRewrite) {
      url.pathname = `/company/${company.slug}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

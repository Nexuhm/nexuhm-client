import 'server-only';

import { cookies } from 'next/headers';

function getSharedHeaders() {
  const token = cookies().get('token');

  return {
    'content-type': 'application/json',
    authorization: `Bearer ${token?.value}`,
  };
}

async function get(
  url: string,
  headers?: Record<string, string>,
): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'GET',
    headers: {
      ...getSharedHeaders(),
      ...headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data || 'Something went wrong!');
  }

  return data;
}

function post(
  url: string,
  payload: any,
  headers?: Record<string, string>,
): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...getSharedHeaders(),
      ...headers,
    },
  });
}

export const client = {
  get,
  post,
};

import 'server-only';

import { cookies } from 'next/headers';

function getSharedHeaders() {
  const token = cookies().get('token');

  return {
    'content-type': 'application/json',
    authorization: `Bearer ${token?.value}`,
  };
}

async function get(url: string): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'GET',
    headers: getSharedHeaders(),
  });

  const data = await res.json();

  return data;
}

function post(url: string, payload: any): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: getSharedHeaders(),
  });
}

export const client = {
  get,
  post,
};

import 'server-only';

import { cookies } from 'next/headers';

function getSharedHeaders() {
  const token = cookies().get('token');

  return {
    'content-type': 'application/json',
    authorization: `Bearer ${token?.value}`,
  };
}

function get(url: string): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'GET',
    headers: getSharedHeaders(),
  });
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

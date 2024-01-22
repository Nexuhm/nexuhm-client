'use server';

import { cookies } from 'next/headers';

export async function generateJob(title: string, description: string) {
  const token = cookies().get('token');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/jobs/generate`, {
    method: 'POST',
    body: JSON.stringify({ title, description }),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token?.value}`,
    },
  });

  if (!res.ok) {
    const data = await res.text();
    throw Error(data);
  }

  const data = await res.json();

  return data;
}

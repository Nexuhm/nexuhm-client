'use server';

import { cookies } from 'next/headers';
import { AuthService, SignUpPayload } from '@/base/services/auth';

const authService = new AuthService();

export async function login(email: string, password: string) {
  const res = await authService.login(email, password);

  if (!res.ok) {
    throw Error('Error during login');
  }

  const { token } = await res.json();

  await setAuthCookie(token);

  return {
    success: true,
  };
}

export async function signup(paylaod: SignUpPayload) {
  const res = await authService.signup(paylaod);

  if (!res.ok) {
    throw Error('Error during login');
  }

  const { token } = await res.json();

  await setAuthCookie(token);

  return {
    success: true,
  };
}

export async function setAuthCookie(token: string) {
  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 1, // 1 week
  });
}

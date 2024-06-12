'use server';

import { cookies } from 'next/headers';
import { AuthService, SignUpPayload } from '@/base/services/auth';
import { client } from '../services/clients/server-client';

export async function login(email: string, password: string) {
  const res = await AuthService.login(email, password);

  const data = await res.json();

  if (!res.ok) {
    return data;
  }

  const { token } = data;

  await setAuthCookie(token);

  return {
    success: true,
  };
}

export async function requestPasswordReset(email: string) {
  return client
    .post('/auth/password/reset/create', { email })
    .then((res) => res.json());
}

export async function validateToken(
  token: string,
): Promise<{ isValid: boolean }> {
  return client
    .post('/auth/password/reset/validate', { token })
    .then((res) => res.json());
}

export async function resetPassword(
  token: string,
  newPassword: string,
  confirmPassword: string,
) {
  return client
    .post('/auth/password/reset', {
      token,
      newPassword,
      confirmPassword,
    })
    .then((res) => res.json());
}

export async function signup(paylaod: SignUpPayload) {
  const res = await AuthService.signup(paylaod);

  if (!res.ok) {
    return res.json();
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
    maxAge: 60 * 60 * 24 * 1, // 1 week,
    domain: process.env.AUTH_COOKIE_DOMAIN,
  });
}

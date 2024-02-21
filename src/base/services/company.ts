import { client } from './browser-client';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export interface SignUpPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class AuthService {
  updateDetails(details: Record<string, string>) {
    return client.put('/company', details);
  }

  signup(payload: SignUpPayload) {
    return fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}

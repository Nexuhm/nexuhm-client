const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export interface SignUpPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class AuthService {
  login(email: string, password: string) {
    return fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    });
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

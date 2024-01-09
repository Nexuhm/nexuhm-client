const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export function login(email: string, password: string) {
  return fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'content-type': 'application/json',
    },
  });
}

interface SignUpPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export function signup(payload: SignUpPayload) {
  return fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  });
}

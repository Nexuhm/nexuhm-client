import 'client-only';

function getSharedHeaders() {
  return {
    'content-type': 'application/json',
  };
}

function get(url: string): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    headers: getSharedHeaders(),
    credentials: 'include',
  });
}

function post(url: string, payload: any, headers?: any): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      ...getSharedHeaders(),
      ...headers,
    },
    credentials: 'include',
  });
}

function multipart(url: string, payload: any): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    method: 'POST',
    body: payload,
    headers: {
      'content-form': 'multipart/form-data',
    },
    credentials: 'include',
  });
}

export const client = {
  get,
  post,
  multipart,
};

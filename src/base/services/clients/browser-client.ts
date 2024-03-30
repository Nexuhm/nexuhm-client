import 'client-only';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  headers?: HeadersInit;
};

export class APIError<T = any> extends Error {
  public response: T;

  constructor(message: string, response: T) {
    super(message);
    this.name = this.constructor.name; // Set the error name to the class name
    this.response = response; // Add the custom response property
  }
}

export class APIClient {
  private baseURL?: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_BASE;
  }

  async request(
    endpoint: string,
    { method = 'GET', body, headers = {} }: RequestOptions = {},
  ): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const options: RequestInit = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.log(data);
        throw new APIError(
          data?.message || 'Something went wrong with the request',
          data,
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  multipart(url: string, payload: any): Promise<any> {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
      method: 'POST',
      body: payload,
      headers: {
        'content-form': 'multipart/form-data',
      },
      credentials: 'include',
    });
  }

  get<T = any>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.request(endpoint, { headers });
  }

  post<T = any>(
    endpoint: string,
    body?: any,
    headers?: HeadersInit,
  ): Promise<T> {
    return this.request(endpoint, { method: 'POST', body, headers });
  }

  put(
    endpoint: string,
    body: Record<string, unknown>,
    headers?: HeadersInit,
  ): Promise<any> {
    return this.request(endpoint, { method: 'PUT', body, headers });
  }

  delete(endpoint: string, headers?: HeadersInit): Promise<any> {
    return this.request(endpoint, { method: 'DELETE', headers });
  }
}

export const client = new APIClient();

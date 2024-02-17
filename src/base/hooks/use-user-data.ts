import useSWR from 'swr';
import { client } from '../services/browser-client';

const fetcher = async (url: string) => {
  const res = await client.get(url);
  const data = await res.json();
  return data;
};

interface UserData {
  picture: string;
  email: string;
  firstname: string;
  lastname: string;
}

export function useUserData() {
  const { data, error, isLoading, mutate } = useSWR<UserData>(
    '/account/details',
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

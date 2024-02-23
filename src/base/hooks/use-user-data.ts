import useSWR from 'swr';
import { client } from '../services/clients/browser-client';

const fetcher = async (url: string) => {
  return client.get(url);
};

interface UserData {
  picture: string;
  email: string;
  firstname: string;
  lastname: string;
  company: string;
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

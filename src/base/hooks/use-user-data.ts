import useSWR from 'swr';
import { client } from '../services/clients/browser-client';

const fetcher = async (url: string) => {
  return client.get(url);
};

interface UserData {
  id: string;
  picture: string;
  email: string;
  firstname: string;
  lastname: string;
  company: string;
}

export function useUserData() {
  return useSWR<UserData>('/account/details', fetcher);
}

'use client';

import { useEffect } from 'react';
import { client } from '@/base/services/clients/browser-client';
import { CandidateListing } from '@/components/modules/candidates-listing';
import { useParams } from 'next/navigation';
import { useSetState } from 'react-use';

interface State {
  data: any[];
  totalCount: number;
  current: number;
  loading: boolean;
}

export function JobCandidates() {
  const params = useParams();
  const [state, setState] = useSetState<State>({
    data: [],
    totalCount: 0,
    current: 1,
    loading: true,
  });

  const fetchCandidates = async () => {
    setState({
      loading: true,
    });

    const data = await client.get(`/admin/candidates?jobId=${params.id}`);
    setState(data);

    setState({
      loading: false,
    });
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return <CandidateListing candidates={state.data} loading={state.loading} />;
}

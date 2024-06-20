import { client } from '@/base/services/clients/server-client';
import { CandidateListing } from '@/components/modules/candidates-listing';

async function getData() {
  const candidates = await client.get('/admin/candidates');
  return candidates;
}

export default async function CandidatesListingPage() {
  const candidates = await getData();
  return <CandidateListing candidates={candidates.data} />;
}

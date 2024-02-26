import { client } from '@/base/services/clients/server-client';
import CareersPageForm from './careers-page-form';

async function getData() {
  const user = await client.get('/account/details');
  return client.get(`/admin/company/${user.company}/careers-page`);
}

export default async function CareersPageSettings() {
  const company = await getData();

  return <CareersPageForm company={company} />;
}

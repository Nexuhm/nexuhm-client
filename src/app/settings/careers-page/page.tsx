import { client } from '@/base/services/clients/server-client';
import CareersPageForm from './careers-page-form';

async function getData() {
  const user = await client.get('/account/details');
  const careersPage = await client.get(`/admin/company/${user.company}/careers-page`);
  return careersPage;
}

export default async function CareersPageSettings() {
  const data = await getData();
  return <CareersPageForm data={data} />;
}

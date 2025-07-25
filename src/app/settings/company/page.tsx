'use client';

import {
  AboutFormValues,
  AddressFormValues,
  CompanyFormValues,
  CompanyLogoFormValues,
  CultureFormValues,
} from '@/base/schemas/company';
import { client } from '@/base/services/clients/browser-client';
import { CompanyLogoForm } from '@/components/modules/company-settings-form/company-logo-form';
import {
  CompanyAboutForm,
  CompanyAddressForm,
  CompanyCultureForm,
  CompanyDetailsForm,
} from '@/components/modules/company-settings-form';
import useSWR from 'swr';

type CompanyDetails = CompanyFormValues &
  AddressFormValues &
  AboutFormValues &
  CultureFormValues &
  CompanyLogoFormValues;

export default function BusinessProfilePage() {
  const { data, mutate } = useSWR<CompanyDetails>(
    '/admin/company',
    async (url: string) => client.get(url),
  );

  const handleSubmit = async (val: Record<string, string>) => {
    await client.post('/admin/company/details', val);
    mutate();
  };

  if (!data) {
    return null;
  }

  return (
    <div className="container max-w-2xl pb-20">
      <h1 className="mb-6 text-2xl">Business Profile</h1>

      <div className="flex flex-col gap-6">
        <CompanyDetailsForm
          onSubmit={handleSubmit}
          defaultValues={{
            name: data.name,
            slug: data.slug,
            companySize: data.companySize,
            website: data.website,
            industry: data.industry,
          }}
        />

        <CompanyLogoForm defaultValue={data.logo} onSubmit={handleSubmit} />

        <CompanyAddressForm
          onSubmit={handleSubmit}
          defaultValues={{
            address: data.address,
          }}
        />

        <CompanyAboutForm
          onSubmit={handleSubmit}
          defaultValues={{
            description: data.description,
          }}
        />

        <CompanyCultureForm
          onSubmit={handleSubmit}
          defaultValues={{
            cultureDescription: data.cultureDescription,
          }}
        />
      </div>
    </div>
  );
}

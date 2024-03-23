'use client';

import { Input } from '@/components/elements/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/base/services/clients/browser-client';
import { OnboardingForm } from '@/components/modules/onboarding-form';
import { AddressFormSchema, AddressFormValues } from '@/base/schemas/company';
import { useCompanyContext } from '@/base/contexts/company/company-context';

export default function OnboardingAddressPage() {
  const router = useRouter();
  const { company } = useCompanyContext();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      address: company?.address,
    },
  });

  const submitHandler = async (values: AddressFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      await client.post('/company/onboarding/details', values);
      router.push('/onboarding/about');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OnboardingForm
      backUrl="/onboarding"
      skipUrl="/onboarding/about"
      title="Business address"
      description="Where is your main business office located"
      onSubmit={handleSubmit(submitHandler)}
      isSubmitting={isSubmitting}
    >
      <Input
        label="Address"
        placeholder="e.g. 22 Baker Street, London W1U 3BW, UK"
        {...register('address')}
      />
    </OnboardingForm>
  );
}

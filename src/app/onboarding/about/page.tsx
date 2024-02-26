'use client';

import { Textarea } from '@/components/elements/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/base/services/clients/browser-client';
import { OnboardingForm } from '@/components/modules/onboarding-form';
import { AboutFormSchema, AboutFormValues } from '@/base/schemas/company';
import { useCompanyContext } from '@/base/contexts/company-context/company-context';

export default function OnboardingAboutPage() {
  const router = useRouter();
  const { company } = useCompanyContext();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(AboutFormSchema),
    defaultValues: {
      description: company?.description,
    },
  });

  const submitHandler = async (values: AboutFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      await client.post('/company/onboarding/details', values);
      router.push('/onboarding/culture');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OnboardingForm
      backUrl="/onboarding/address"
      skipUrl="/onboarding/culture"
      title="Describe your business"
      description="Help us understand what your business does in a few sentences. This will improve how we score applicants accuracy."
      onSubmit={handleSubmit(submitHandler)}
      isSubmitting={isSubmitting}
    >
      <Textarea
        rows={7}
        label="Business description"
        {...register('description')}
        required
      />
    </OnboardingForm>
  );
}

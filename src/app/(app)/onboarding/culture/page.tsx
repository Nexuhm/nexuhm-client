'use client';

import { Textarea } from '@/components/elements/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/base/services/clients/browser-client';
import { OnboardingForm } from '@/components/modules/onboarding-form';
import { CultureFormSchema, CultureFormValues } from '@/base/schemas/company';
import { useCompanyContext } from '@/base/contexts/company/company-context';
import { OnboardingStage } from '@/base/types/users';

export default function OnboardingCulturePage() {
  const router = useRouter();
  const { company } = useCompanyContext();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CultureFormValues>({
    resolver: zodResolver(CultureFormSchema),
    defaultValues: {
      cultureDescription: company?.cultureDescription,
    },
  });

  const submitHandler = async (values: CultureFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      await client.post('/admin/company/details', values);
      await client.post('/users/onboarding/stage', {
        stage: OnboardingStage.Culture,
      });

      router.push('/onboarding/logo');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OnboardingForm
      backUrl="/onboarding/about"
      skipUrl="/onboarding/logo"
      title="Describe your culture"
      description="Help us understand your business culture so we can help find you the best candidates. This will improve how we score applicants accuracy."
      onSubmit={handleSubmit(submitHandler)}
      isSubmitting={isSubmitting}
    >
      <Textarea
        rows={7}
        label="Culture description"
        {...register('cultureDescription')}
        required
      />
    </OnboardingForm>
  );
}

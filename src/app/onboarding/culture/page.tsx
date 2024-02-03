'use client';

import { Textarea } from '@/components/elements/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { client } from '@/base/services/browser-client';
import { OnboardingForm } from '@/components/modules/onboarding-form';

const CultureFormSchema = z.object({
  cultureDescription: z.string(),
});

type CultureFormValues = z.infer<typeof CultureFormSchema>;

export default function OnboardingCulturePage() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CultureFormValues>({
    resolver: zodResolver(CultureFormSchema),
  });

  const submitHandler = async (values: CultureFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      const res = await client.post('/company/onboarding/details', values);

      if (!res.ok) {
        throw Error(await res.data());
      }

      router.push('/admin/jobs');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OnboardingForm
      backUrl="/onboarding/about"
      skipUrl="/admin/jobs"
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

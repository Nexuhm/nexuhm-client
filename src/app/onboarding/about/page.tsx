'use client';

import { Textarea } from '@/components/elements/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { client } from '@/base/services/browser-client';
import { OnboardingForm } from '@/components/modules/onboarding-form';

const AboutFormSchema = z.object({
  description: z.string(),
});

type AboutFormValues = z.infer<typeof AboutFormSchema>;

export default function OnboardingAboutPage() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(AboutFormSchema),
  });

  const submitHandler = async (values: AboutFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      const res = await client.post('/company/onboarding/details', values);

      if (!res.ok) {
        throw Error(await res.data());
      }

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

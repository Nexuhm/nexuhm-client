'use client';

import { Input } from '@/components/elements/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { client } from '@/base/services/browser-client';
import { OnboardingForm } from '@/components/modules/onboarding-form';

const AddressFormSchema = z.object({
  address: z.string(),
});

type AddressFormValues = z.infer<typeof AddressFormSchema>;

export default function OnboardingAddressPage() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
  });

  const submitHandler = async (values: AddressFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      const res = await client.post('/company/onboarding/details', values);

      if (!res.ok) {
        throw Error(await res.data());
      }

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

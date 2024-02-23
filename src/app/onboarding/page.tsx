'use client';

import { Icon } from '@/components/elements/icon';
import { Input, Select } from '@/components/elements/input';
import { COMPANY_SIZE_OPTIONS, INDUSTRIES } from './consts';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/base/services/clients/browser-client';
import { useRouter } from 'next/navigation';
import { OnboardingForm } from '@/components/modules/onboarding-form';
import { CompanyFormSchema, CompanyFormValues } from '@/base/schemas/company';


export default function OnboardingPage() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema),
  });

  const submitHandler = async (values: CompanyFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      await client.post('/company/onboarding/details', values);
      router.push('/onboarding/address');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OnboardingForm
      title="Tell us about your business"
      description="   Help us understand what your business does in a few sentences"
      onSubmit={handleSubmit(submitHandler)}
      isSubmitting={isSubmitting}
    >
      <Input
        label="Company name"
        placeholder="e.g. Nexuhm"
        required
        {...register('name', { required: true })}
        error={errors.name?.message}
      />

      <Controller
        control={control}
        name="companySize"
        render={({ field }) => (
          <Select
            required
            label="Size"
            placeholder="e.g. 51-200 employees"
            value={field.value}
            options={COMPANY_SIZE_OPTIONS}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="industry"
        render={({ field }) => (
          <Select
            required
            label="Industry"
            value={field.value}
            placeholder="e.g. Finance"
            options={INDUSTRIES}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        label="Company website"
        placeholder="e.g. https://nexuhm.com"
        required
        {...register('website', { required: true })}
        error={errors.website?.message}
      />
    </OnboardingForm>
  );
}

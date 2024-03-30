'use client';

import { Input } from '@/components/elements/input';
import { COMPANY_SIZE_OPTIONS, INDUSTRIES } from './consts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIError, client } from '@/base/services/clients/browser-client';
import { useRouter } from 'next/navigation';
import { OnboardingForm } from '@/components/modules/onboarding-form';
import { CompanyFormSchema, CompanyFormValues } from '@/base/schemas/company';
import { useCompanyContext } from '@/base/contexts/company/company-context';
import slugify from 'slugify';
import { ComboboxSelect } from '@/components/elements/input/combobox';
import { OnboardingStage } from '@/base/types/users';
import { useUpdateEffect } from 'react-use';

export default function OnboardingPage() {
  const router = useRouter();
  const { company } = useCompanyContext();

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      name: company?.name,
      website: company?.website,
      companySize: company?.companySize,
      industry: company?.industry,
    },
  });

  const submitHandler = async (values: CompanyFormValues) => {
    if (isSubmitting) {
      return null;
    }

    try {
      await client.post('/admin/company/details', values);
      await client.post('/users/onboarding/stage', {
        stage: OnboardingStage.Business,
      });

      router.push('/onboarding/address');
    } catch (err) {
      if (err instanceof APIError) {
        return Object.entries(err.response.fields).forEach(([key, value]) => {
          setError(key as any, {
            message: value as string,
          });
        });
      }
    }
  };

  const name = watch('name');

  useUpdateEffect(() => {
    const slug = slugify(name, {
      lower: true,
      trim: true,
      strict: true,
    });

    setValue('slug', slug, {
      shouldValidate: true,
    });
  }, [name, setValue]);

  return (
    <OnboardingForm
      title="Tell us about your business"
      description="Help us understand what your business does in a few sentences"
      onSubmit={handleSubmit(submitHandler)}
      isSubmitting={isSubmitting}
    >
      <Input
        label="Company name"
        placeholder="e.g. Nexuhm"
        error={errors.name?.message}
        required
        {...register('name', { required: true })}
      />

      <div>
        <Input
          label="Careers page namespace"
          placeholder="e.g. google"
          error={errors.slug?.message}
          suffix=".nexuhm.com"
          required
          {...register('slug', { required: true })}
        />
      </div>

      <Controller
        control={control}
        name="companySize"
        render={({ field }) => (
          <ComboboxSelect
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
          <ComboboxSelect
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

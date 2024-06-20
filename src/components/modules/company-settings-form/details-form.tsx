import { Controller, useForm } from 'react-hook-form';
import { Input, Select } from '@/components/elements/input';
import { COMPANY_SIZE_OPTIONS, INDUSTRIES } from '@/app/(app)/onboarding/consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyFormSchema, CompanyFormValues } from '@/base/schemas/company';
import { CompanySettingsForm } from './company-settings-form';
import { ComboboxSelect } from '@/components/elements/input/combobox';

export function CompanyDetailsForm({
  onSubmit,
  defaultValues,
}: {
  defaultValues: CompanyFormValues;
  onSubmit: (val: CompanyFormValues) => void;
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm<CompanyFormValues>({
    defaultValues,
    resolver: zodResolver(CompanyFormSchema),
  });

  return (
    <CompanySettingsForm
      title="Basic details"
      description="Let’s start with the basics"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Input
        label="Company name"
        placeholder="e.g. Nexuhm"
        required
        {...register('name', { required: true })}
        error={errors.name?.message}
      />

      <Input
        label="Careers page namespace"
        placeholder="e.g. acme"
        error={errors.slug?.message}
        suffix=".nexuhm.com"
        required
        {...register('slug', { required: true })}
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
    </CompanySettingsForm>
  );
}

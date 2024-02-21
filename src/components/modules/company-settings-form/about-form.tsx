'use client';

import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AboutFormSchema, AboutFormValues } from '@/base/schemas/company';
import { CompanySettingsForm } from './company-settings-form';

export function CompanyAboutForm({
  onSubmit,
  defaultValues,
}: {
  defaultValues: AboutFormValues;
  onSubmit: (val: AboutFormValues) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AboutFormValues>({
    defaultValues,
    resolver: zodResolver(AboutFormSchema),
  });

  return (
    <CompanySettingsForm
      title="About your business"
      description="Help us understand what your business does in a few sentences. This will improve how we score applicants accuracy."
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Textarea
        rows={7}
        label="Business description"
        {...register('description')}
        required
      />
    </CompanySettingsForm>
  );
}

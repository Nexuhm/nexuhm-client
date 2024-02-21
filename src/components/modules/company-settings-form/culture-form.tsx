'use client';

import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { CultureFormSchema, CultureFormValues } from '@/base/schemas/company';
import { CompanySettingsForm } from './company-settings-form';

export function CompanyCultureForm({
  onSubmit,
  defaultValues,
}: {
  defaultValues: CultureFormValues;
  onSubmit: (val: CultureFormValues) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CultureFormValues>({
    defaultValues,
    resolver: zodResolver(CultureFormSchema),
  });

  return (
    <CompanySettingsForm
      title="Your culture"
      description="Help us understand your business culture so we can help find you the best candidates. This will improve how we score applicants accuracy."
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        rows={7}
        label="Culture description"
        {...register('cultureDescription')}
        required
      />
    </CompanySettingsForm>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressFormSchema, AddressFormValues } from '@/base/schemas/company';
import { CompanySettingsForm } from './company-settings-form';

export function CompanyAddressForm({
  onSubmit,
  defaultValues,
}: {
  defaultValues: AddressFormValues;
  onSubmit: (val: AddressFormValues) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AddressFormValues>({
    defaultValues,
    resolver: zodResolver(AddressFormSchema),
  });

  return (
    <CompanySettingsForm
      title="Location"
      description="Where is your main business office located"
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <Input
        label="Address"
        placeholder="e.g. 22 Baker Street, London W1U 3BW, UK"
        {...register('address')}
      />
    </CompanySettingsForm>
  );
}

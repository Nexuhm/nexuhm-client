'use client';

import { APIError } from '@/base/services/clients/browser-client';
import { Button } from '@/components/elements/button';
import { Dialog } from '@/components/elements/dialog';
import { Input, Select } from '@/components/elements/input';
import { Form } from '@/components/modules/form/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const inviteFormSchema = z.object({
  email: z.string().email(),
  role: z.enum(['Recruiter', 'Owner']),
});

export type InviteFormValues = z.infer<typeof inviteFormSchema>;

interface InivteFormDialog {
  open: boolean;
  onClose: () => void;
  onInvite: (val: InviteFormValues) => void;
}

export function InviteFormDialog({
  open,
  onClose,
  onInvite,
}: InivteFormDialog) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
  });

  const submitHandler = async (val: InviteFormValues) => {
    try {
      await onInvite(val);
      reset();
    } catch (err) {
      if (err instanceof APIError) {
        setError('root', {
          message: err.response.message,
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="w-full max-w-xs">
      <Dialog.Title>Invite Member</Dialog.Title>

      <Dialog.Content>
        <Form id="invite-form" onSubmit={handleSubmit(submitHandler)}>
          <Input
            label="Email"
            type="email"
            placeholder="Member email"
            error={errors.email?.message}
            {...register('email', { required: true })}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="Role"
                placeholder="Member role"
                value={field.value}
                error={errors.role?.message}
                onChange={field.onChange}
                options={[
                  { value: 'Recruiter', label: 'Hiring Manager' },
                  { value: 'Owner', label: 'Owner' },
                ]}
              />
            )}
          />
        </Form>

        {errors.root?.message && (
          <div className="error-message mt-3">{errors.root?.message}</div>
        )}
      </Dialog.Content>

      <Dialog.Actions>
        <Button variant="link" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="invite-form"
          variant="primary"
          loading={isSubmitting}
        >
          Add Member
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

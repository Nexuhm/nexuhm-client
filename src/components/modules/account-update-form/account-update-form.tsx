'use client'

import { client } from '@/base/services/browser-client';
import { Button } from '@/components/elements/button';
import { Input } from '@/components/elements/input';
import { useForm } from 'react-hook-form';
import { Spinner } from '@/components/elements/spinner';
import { z } from 'zod';

const accountFormSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
});

type AccountFormSchema = z.infer<typeof accountFormSchema>;

export function AccountDetailsUpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AccountFormSchema>({
    defaultValues: async () => {
      const res = await client.get('/account/details');
      const data = await res.json();
      return data;
    },
  });

  const submitHandler = async (value: AccountFormSchema) => {
    await client.post('/account/update', value);
  };

  return (
    <div className="mb-10 p-6 card-container">
      <div className="mb-2">
        <div className="font-inter text-xl font-medium">Your Details</div>
        <div className="text-sm text-content-secondary">
          We can reach out to you with updates on candidate progress
        </div>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <Input
          label="Firstname"
          {...register('firstname', { required: true })}
        />

        <Input label="Lastname" {...register('lastname', { required: true })} />

        <Input label="Email" {...register('email', { required: true })} />

        <div>
          <Button type="submit" disabled={isSubmitting}>
            Save
            {isSubmitting && (
              <Spinner className="ml-2" color="white" size={15} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

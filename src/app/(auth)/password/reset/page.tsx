'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/elements/button';
import { Input } from '@/components/elements/input/input';

import { AuthForm } from '@/components/modules/auth-form';
import { requestPasswordReset } from '@/base/actions/auth';
import { useState } from 'react';
import { SuccessMessage } from '@/components/elements/success-message';

const PasswordResetRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type PasswordResetRequestValues = z.infer<typeof PasswordResetRequestSchema>;

export default function PasswordResetRequestPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<PasswordResetRequestValues>({
    resolver: zodResolver(PasswordResetRequestSchema),
  });

  const [success, setSuccess] = useState<boolean>();

  const onSubmit = async (data: PasswordResetRequestValues) => {
    const res = await requestPasswordReset(data.email);

    if (res.success) {
      return setSuccess(true);
    }

    setError('root', {
      message: 'Error during operation',
    });
  };

  return (
    <AuthForm.Container>
      {success ? (
        <SuccessMessage>
          <div className="mb-1 font-medium">
            We've sent an email with further instructions.
          </div>

          <div>
            <a href="/login" className="text-blue">
              Return to sign in
            </a>
          </div>
        </SuccessMessage>
      ) : (
        <AuthForm.Form onSubmit={handleSubmit(onSubmit)}>
          <AuthForm.Header>Reset your password</AuthForm.Header>

          <div className="mb-8">
            To reset your password, please enter your email address you used.
          </div>

          <Input
            id="email"
            label="Email address"
            placeholder="Your email address"
            {...register('email')}
          />

          <div>
            <a href="/login" className="text-blue">
              Return to sign in
            </a>
          </div>

          <Button type="submit" loading={isSubmitting}>
            Continue
          </Button>
        </AuthForm.Form>
      )}
    </AuthForm.Container>
  );
}

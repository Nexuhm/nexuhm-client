'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/elements/button';
import { Input } from '@/components/elements/input/input';

import { AuthForm } from '@/components/modules/auth-form';
import { useState } from 'react';
import { SuccessMessage } from '@/components/elements/success-message';
import { resetPassword } from '@/base/actions/auth';

const PasswordResetSchema = z.object({
  newPassword: z.string(),
  confirmPassword: z.string(),
});

type PasswordResetValues = z.infer<typeof PasswordResetSchema>;

export function PasswordResetForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<PasswordResetValues>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const [success, setSuccess] = useState<boolean>();

  const onSubmit = async (data: PasswordResetValues) => {
    const res = await resetPassword(
      token,
      data.newPassword,
      data.confirmPassword,
    );

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
            You've successfully reset your password.
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
            To reset your password, please enter new credentials.
          </div>

          <Input
            id="newPassword"
            label="New Password"
            type="password"
            placeholder="Your new password"
            {...register('newPassword')}
          />

          <Input
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Please type same password"
            {...register('confirmPassword')}
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

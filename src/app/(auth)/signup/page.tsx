'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/elements/button';
import { Divider } from '@/components/elements/divider';
import { Input } from '@/components/elements/input/input';

import { AuthForm } from '@/components/modules/auth-form';
import { signup } from '@/base/actions/auth';
import { useEffect, useState } from 'react';
import { client } from '@/base/services/clients/browser-client';

const SignUpFormSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('inviteToken');

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const fetchInvite = async () => {
    const res = await client.get(`/invites/${inviteToken}/verify`);

    if (res.invite) {
      setValue('email', res.invite.email);
    }
  };

  useEffect(() => {
    if (inviteToken) {
      fetchInvite();
    }
  }, [inviteToken]);

  const onSubmit = async (data: SignUpFormValues) => {
    const res = await signup({
      ...data,
      inviteToken,
    });

    if (!res.success) {
      return Object.entries(res.fields).forEach(([key, value]) => {
        setError(key as keyof SignUpFormValues, {
          message: value as string,
        });
      });
    }

    router.push('/onboarding');
  };

  return (
    <AuthForm.Container>
      <AuthForm.Header>Sign Up</AuthForm.Header>

      <div className="mb-10">
        Already have an account?
        <a href="/login" className="mx-1 text-blue">
          Sign In
        </a>
      </div>

      <AuthForm.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="firstname"
          label="Firstname"
          placeholder="Your firstname"
          error={errors.firstname?.message}
          {...register('firstname')}
        />

        <Input
          id="lastname"
          label="Lastname"
          placeholder="Your lastname"
          error={errors.lastname?.message}
          {...register('lastname')}
        />

        <Input
          id="email"
          label="Email address"
          placeholder="Your email address"
          type="email"
          readOnly={!!inviteToken}
          disabled={!!inviteToken}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          id="password"
          label="Password"
          placeholder="Your password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div>
          <a href="/password/reset" className="text-blue">
            Forgot password?
          </a>
        </div>

        <Button type="submit" loading={isSubmitting} size="lg">
          Sign Up
        </Button>
      </AuthForm.Form>

      <Divider className="my-6">Or</Divider>

      <AuthForm.OAuthActions />
    </AuthForm.Container>
  );
}

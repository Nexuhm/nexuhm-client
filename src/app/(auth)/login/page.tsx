'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/elements/button';
import { Divider } from '@/components/elements/divider';
import { Input } from '@/components/elements/input/input';

import { AuthForm } from '@/components/modules/auth-form';
import { login } from '@/base/services/auth';

const SignInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>;

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    const res = await login(data.email, data.password);

    if (!res.ok) {
      throw Error('Error during login');
    }

    router.push('/dashboard');
  };

  return (
    <AuthForm.Container>
      <AuthForm.Header>
        Don’t have an account?{' '}
        <a href="/signup" className="text-blue">
          Sign Up
        </a>
      </AuthForm.Header>

      <AuthForm.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email address"
          placeholder="Your email address"
          {...register('email')}
        />

        <Input
          id="password"
          label="Password"
          placeholder="Your password"
          type="password"
          {...register('password')}
        />

        <div>
          <a href="#" className="text-blue">
            Forgot password?
          </a>
        </div>

        <Button type="submit">Continue</Button>
      </AuthForm.Form>

      <Divider className="my-6">Or</Divider>

      <AuthForm.OAuthActions />
    </AuthForm.Container>
  );
}

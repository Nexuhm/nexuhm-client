'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/elements/button';
import { Divider } from '@/components/elements/divider';
import { Input } from '@/components/elements/input/input';

import { AuthForm } from '@/components/modules/auth-form';
import { signup } from '@/base/actions/auth';

const SignUpFormSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

export default function SignUpPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const res = await signup(data);

    if (!res.success) {
      throw Error('Error during login');
    }

    router.push('/admin/jobs');
  };

  return (
    <AuthForm.Container>
      <AuthForm.Header>
        Already have an account?
        <a href="/login" className="mx-1 text-blue">
          Sign In
        </a>
      </AuthForm.Header>

      <AuthForm.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="firstname"
          label="Firstname"
          placeholder="Your firstname"
          {...register('firstname')}
        />

        <Input
          id="lastname"
          label="Lastname"
          placeholder="Your lastname"
          {...register('lastname')}
        />

        <Input
          id="email"
          label="Email address"
          placeholder="Your email address"
          type="email"
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
          <a href="" className="text-blue">
            Forgot password?
          </a>
        </div>

        <Button size='lg'>Sign Up</Button>
      </AuthForm.Form>

      <Divider className="my-6">Or</Divider>

      <AuthForm.OAuthActions />
    </AuthForm.Container>
  );
}

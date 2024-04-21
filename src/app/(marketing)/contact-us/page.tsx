'use client';

import { APIError, client } from '@/base/services/clients/browser-client';
import { Button } from '@/components/elements/button';
import { Input, Textarea } from '@/components/elements/input';
import { Form } from '@/components/modules/form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactFormSchema = z.object({
  subject: z
    .string({ description: 'Subject' })
    .min(3, 'Subject must contain at least 3 characters')
    .max(40, 'Subject must contain maximum 50 characters'),
  name: z
    .string()
    .min(3, 'Name must contain at least 3 characters')
    .max(40, 'Name must contain maximum 50 characters'),
  email: z.string().email(),
  message: z
    .string()
    .min(100, 'Message must contain at least 100 characters')
    .max(1000, 'Message must contain maximum 1000 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactUsPage() {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const submitHandler = async (val: ContactFormValues) => {
    try {
      await client.post('/send/message', val);
      reset();
    } catch (err) {
      if (err instanceof APIError) {
        return Object.entries(err.response.fields).forEach(([key, value]) => {
          setError(key as any, {
            message: value as string,
          });
        });
      }
    }
  };

  return (
    <div
      className={clsx(
        'container mx-auto grid flex-1 grid-cols-1 md:grid-cols-3',
        'items-center gap-16 px-6 lg:px-8',
      )}
    >
      <div className="md:col-span-2">
        <h1 className="mb-6 text-7xl font-medium uppercase italic">
          Let's start building your culture
        </h1>
        <div>
          <a className="text-blue">hello@nexuhm.com</a>
        </div>
      </div>
      <div>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Input
            {...register('subject')}
            label="Subject"
            placeholder="Subject"
            variant="gray"
            required
            error={errors.subject?.message}
          />
          <Input
            {...register('name')}
            label="Name"
            placeholder="What is your name?"
            variant="gray"
            required
            error={errors.name?.message}
          />
          <Input
            {...register('email')}
            label="E-mail"
            placeholder="What is your email?"
            variant="gray"
            required
            type="email"
            error={errors.email?.message}
          />
          <Textarea
            {...register('message')}
            hint="Minimum length is 100 symbols"
            label="Message"
            placeholder="What plan do you want?"
            rows={5}
            variant="gray"
            required
            error={errors.message?.message}
          />

          <Button type="submit" size="lg" className="mt-6">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

'use client';

import { Button } from '@/components/elements/button';
import { Input, Textarea } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const jobGenerationFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

type JobGenerationFormSchema = z.infer<typeof jobGenerationFormSchema>;

export function JobGenerationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobGenerationFormSchema>({
    resolver: zodResolver(jobGenerationFormSchema),
  });

  const submitHandler = async (val: JobGenerationFormSchema) => {};

  console.log(errors);

  return (
    <div className="container mx-auto max-w-md">
      <div className="text-center">
        <div className="mb-2 text-2xl leading-10">Nexuhm AI</div>
        <div className="leading-6">
          Generate your job description with ease.
        </div>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <Input
          id="title"
          label="Job title"
          placeholder="e.g. Product lead"
          containerClassName="bg-[#F1F1F1]"
          error={errors.title?.message}
          {...register('title', { required: true })}
        />

        <Textarea
          id="description"
          label="Enter a short description of the role you’re after"
          rows={6}
          containerClassName="bg-[#F1F1F1]"
          error={errors.description?.message}
          placeholder={
            'e.g. Responsible for overseeing the development and success of a product,' +
            'guiding cross-functional teams, setting product strategy and vision,' +
            'and ensuring alignment with customer needs and business goals.'
          }
          {...register('description', { required: true })}
        />

        <div className="flex flex-col items-center gap-5">
          <Button>Generate job</Button>

          <a href="/" className="text-sm text-content-secondary underline">
            I want to manually do it
          </a>
        </div>
      </form>
    </div>
  );
}

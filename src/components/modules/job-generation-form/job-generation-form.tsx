'use client';

import { generateJob } from '@/base/actions/jobs';
import { JobSchema } from '@/base/types/jobs';
import { Button } from '@/components/elements/button';
import { Input, Textarea } from '@/components/elements/input';
import { Spinner } from '@/components/elements/spinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const jobGenerationFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type JobGenerationFormSchema = z.infer<typeof jobGenerationFormSchema>;

interface JobGenerationFormProps {
  onComplete: (result?: JobSchema) => void;
}

export function JobGenerationForm({ onComplete }: JobGenerationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobGenerationFormSchema>({
    resolver: zodResolver(jobGenerationFormSchema),
  });

  const submitHandler = async (val: JobGenerationFormSchema) => {
    try {
      const data = await generateJob(
        val.title,
        val.description,
        navigator.language,
      );
      onComplete(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="container mx-auto flex max-w-md flex-col gap-4"
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
        <Button type="submit" disabled={isSubmitting}>
          Generate job
          {isSubmitting && <Spinner className="ml-2" size={15} color="white" />}
        </Button>

        <button
          onClick={() => onComplete()}
          className="text-sm text-content-secondary underline"
        >
          I want to manually do it
        </button>
      </div>
    </form>
  );
}

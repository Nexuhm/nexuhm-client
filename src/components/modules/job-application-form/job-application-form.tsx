'use client';

import React, { ReactNode, useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { client } from '@/base/services/clients/browser-client';
import { useParams } from 'next/navigation';

const schema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  resume: z.unknown().optional(),
  coverLetter: z.unknown().optional(),
  videoResume: z.unknown().optional(),
});

type ApplicationForm = z.infer<typeof schema>;

export function JobApplicationForm() {
  const params = useParams();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema),
  });

  const [isResumeLoading, setIsResumeLoading] = useState(false);

  const submitHandler = async (values: ApplicationForm) => {
    const formData = Object.entries(values).reduce((fd, [key, value]) => {
      if (value instanceof FileList) {
        fd.append(key, value[0]);
      } else {
        fd.append(key, value as File);
      }
      return fd;
    }, new FormData());

    const res = await client.multipart(`/jobs/${params.slug}/apply`, formData);
    const data = await res.json();
  };

  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    setIsResumeLoading(true);

    const res = await client.multipart(`/candidates/parse-resume`, formData);
    const data = await res.json();

    Object.entries(data).map(([key, value]) => {
      setValue(key as any, value);
    });

    setIsResumeLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Resume/CV */}
          <FileField
            control={control}
            name="resume"
            label="Resume/CV*"
            onChange={handleResumeUpload}
            loading={isResumeLoading}
          />

          {/* Cover Letter */}
          <FileField
            control={control}
            name="coverLetter"
            label="Cover Letter*"
          />
        </div>

        {/* Name Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            variant="gray"
            label="First Name"
            placeholder="John"
            required
            {...register('firstname')}
            error={errors.firstname?.message}
          />
          <Input
            variant="gray"
            label="Last Name"
            placeholder="Doe"
            required
            {...register('lastname')}
            error={errors.lastname?.message}
          />
        </div>

        {/* Contact Inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Email"
            placeholder="john.doe@example.com"
            variant="gray"
            required
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            variant="gray"
            label="Phone"
            placeholder="+123456789"
            required
            {...register('phone')}
            error={errors.phone?.message}
          />
        </div>

        {/* Location Input */}
        <div>
          <Input
            variant="gray"
            label="Location (City)"
            placeholder="London"
            required
            {...register('location')}
            error={errors.location?.message}
          />
        </div>

        {/* Video Resume */}
        <div className="mb-6">
          <FileField
            control={control}
            label={
              <>
                Boost your chances and upload a Video Resume/CV?
                <Icon icon="circled-question" className="ml-2 w-5 text-blue" />
              </>
            }
            name="videoResume"
            accept="video/mp4, video/avi, video/mpeg, video/quicktime, .mp4, .avi, .mpeg, .mov"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between">
          <Button variant="secondary">Cancel</Button>
          <Button type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

function FileField({
  name,
  label,
  control,
  accept,
  loading,
  onChange,
}: {
  name: string;
  label: ReactNode;
  control: Control<any>;
  accept?: string;
  loading?: boolean;
  onChange?: (file: File) => void;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <div className="mb-2 flex items-center text-sm">{label}</div>
          <Button as="label" className="cursor-pointer" loading={loading}>
            {field.value?.length ? 'Browse other' : 'Attach'}
            <input
              type="file"
              className="hidden"
              name={field.name}
              accept={accept}
              onChange={(e) => {
                field.onChange(e.target.files);

                if (onChange && e.target.files?.[0]) {
                  onChange(e.target.files?.[0]);
                }
              }}
              ref={field.ref}
            />
          </Button>

          <div className="mt-2 text-xs text-content-tertiary">
            {field.value?.[0]?.name}
          </div>
        </div>
      )}
    />
  );
}

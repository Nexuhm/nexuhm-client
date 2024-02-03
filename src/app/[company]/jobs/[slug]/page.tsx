'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { client } from '@/base/services/browser-client';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  resume: z.instanceof(File).optional(),
  coverLetter: z.instanceof(File).optional(),
  videoResume: z.instanceof(File).optional(),
});

type ApplicationForm = z.infer<typeof schema>;

export default function JobPostingPage() {
  const { register, handleSubmit, setValue } = useForm<ApplicationForm>({
    resolver: zodResolver(schema),
  });

  const onFileChange = (event: React.ChangeEvent<any>) => {
    setValue(event.target.name, event.target.files[0]);
  };

  const submitHandler = async (values: ApplicationForm) => {
    const formData = Object.entries(values).reduce((fd, [key, value]) => {
      fd.append(key, value);
      return fd;
    }, new FormData());

    const res = await client.multipart('/candidates/apply', formData);

    const data = await res.data();

    console.log(data);
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-lg">
        <div className="mb-6">
          <div className="text-[40px] font-medium">Senior UX designer</div>
          <div className="">Full Time • London, Remote friendly</div>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Resume/CV */}
              <div>
                <div className="mb-2 flex items-center text-sm">
                  Resume/CV?*
                </div>
                <Button as="label">
                  Attach
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    {...register('resume')}
                    onChange={onFileChange}
                  />
                </Button>
              </div>
              {/* Cover Letter */}
              <div>
                <div className="mb-2 flex items-center text-sm">
                  Cover Letter
                </div>
                <Button as="label">
                  Attach
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    {...register('coverLetter')}
                    onChange={onFileChange}
                  />
                </Button>
              </div>
            </div>

            {/* Name Inputs */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                variant="gray"
                label="First Name"
                placeholder="John"
                required
                {...register('firstName')}
              />
              <Input
                variant="gray"
                label="Last Name"
                placeholder="Doe"
                required
                {...register('lastName')}
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
              />
              <Input
                variant="gray"
                label="Phone"
                placeholder="+123456789"
                required
                {...register('phone')}
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
              />
            </div>

            {/* Video Resume */}
            <div className="mb-6">
              <div className="mb-2 flex items-center text-sm">
                Boost your chances and upload a Video Resume/CV?
                <Icon icon="circled-question" className="ml-2 w-5 text-blue" />
              </div>
              <Button as="label">
                Upload a video resume
                <input
                  type="file"
                  accept="video/mp4, video/avi, video/mpeg, video/quicktime, .mp4, .avi, .mpeg, .mov"
                  className="hidden"
                  {...register('videoResume')}
                  onChange={onFileChange}
                />
              </Button>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-between">
              <Button variant="secondary">Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

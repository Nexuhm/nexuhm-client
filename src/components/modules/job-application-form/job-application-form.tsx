'use client';

import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Button } from '@/components/elements/button';
import { Input } from '@/components/elements/input';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { client } from '@/base/services/clients/browser-client';
import { useParams } from 'next/navigation';
import { SuccessMessage } from '@/components/elements/success-message';
import { ResumeAutofillUploader } from './resume-autofill-uploader';
import { Checkbox } from '@/components/elements/checkbox';
import { FileField } from './file-field';
import { ScreeningQuestion } from '@/base/types/jobs';
import { ScreeningQuestionField } from './screening-question-field';

const schema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  resume: z.unknown(),
  coverLetter: z.unknown().optional(),
  videoResume: z.unknown(),
  screeningQuestions: z.array(z.unknown()).optional(),
  consent: z.boolean(),
});

type ApplicationForm = z.infer<typeof schema>;

interface JobApplicationFormProps {
  screeningQuestions: ScreeningQuestion[];
}

export function JobApplicationForm({
  screeningQuestions,
}: JobApplicationFormProps) {
  const params = useParams();

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors, isValid },
  } = useForm<ApplicationForm>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const consentController = useController({
    control,
    name: 'consent',
  });

  const [isResumeLoading, setIsResumeLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const resumeValue = watch('resume');
  const coverLetterValue = watch('coverLetter');
  const videoResumeValue = watch('videoResume');
  const screeningQuestionValues = watch('screeningQuestions');

  const submitHandler = async (values: ApplicationForm) => {
    const formData = Object.entries(values).reduce((fd, [key, value]) => {
      if (value instanceof FileList) {
        fd.append(key, value[0]);
      } else if (key === 'screeningQuestions') {
        const values = value as any[];

        values.map((val) => {
          fd.append('screeningQuestions[]', val);
        });
      } else {
        fd.append(key, value as File);
      }

      return fd;
    }, new FormData());

    try {
      const res = await client.multipart(
        `/jobs/${params.slug}/apply`,
        formData,
      );
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(false);
    }
  };

  const handleResumeUpload = async (file: File | null) => {
    if (!file) {
      return null;
    }

    setValue('resume', file);

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

  if (isSuccess) {
    return (
      <SuccessMessage>
        Thank you for submitting your application. We will contact you once
        we’ve review your details.
      </SuccessMessage>
    );
  }

  console.log(screeningQuestionValues);

  return (
    <div>
      <ResumeAutofillUploader
        value={resumeValue}
        loading={isResumeLoading}
        onUpload={handleResumeUpload}
      />

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-5">
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
              label="Address"
              placeholder="London"
              required
              {...register('location')}
              error={errors.location?.message}
            />
          </div>

          {/* Resume/CV */}
          <FileField
            required
            name="resume"
            label="Resume"
            value={resumeValue as File}
            onChange={handleResumeUpload}
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                ['.docx'],
              'application/msword': ['.doc'],
            }}
          />

          {/* Resume/CV */}
          <FileField
            name="coverLetter"
            label="Cover Letter"
            value={coverLetterValue as File}
            onChange={(val) => setValue('coverLetter', val)}
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                ['.docx'],
              'application/msword': ['.doc'],
            }}
          />

          {/* Video Resume */}
          <div>
            <FileField
              required
              onChange={(file) => setValue('videoResume', file)}
              value={videoResumeValue as File}
              label={<>Boost your chances and upload a Video Resume/CV?</>}
              name="videoResume"
              accept={{
                'video/mp4': ['.mp4'],
                'video/avi': ['.avi'],
                'video/mpeg': ['.mpeg'],
                'video/quicktime': ['.mov'],
              }}
            />
          </div>

          {screeningQuestions.map((fieldProps, index) => (
            <ScreeningQuestionField
              key={index}
              {...fieldProps}
              value={screeningQuestionValues?.[index] as any}
              onChange={(val) => setValue(`screeningQuestions.${index}`, val)}
            />
          ))}

          <div className="mt-6">
            <Checkbox
              required
              name="consent"
              onChange={consentController.field.onChange}
              error={consentController.fieldState.error?.message}
              label={
                <>
                  I have read, understand and accept the content of the Privacy
                  Notice and consent to the processing of my data as part of
                  this application.
                </>
              }
            />
          </div>

          {/* Submit */}
          <div>
            <Button
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useCompanyContext } from '@/base/contexts/company/company-context';
import { client } from '@/base/services/clients/browser-client';
import { MediaService } from '@/base/services/media';
import { Button } from '@/components/elements/button';
import { OnboardingForm } from '@/components/modules/onboarding-form';
import { format } from 'date-fns';

export default function UploadLogoPage() {
  const router = useRouter();
  const { company } = useCompanyContext();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      logo: company!.logo,
    },
  });

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
    },
    maxFiles: 1,
    onDrop: async (files) => {
      setLoading(true);

      try {
        const data = await MediaService.upload(files[0], {
          filename: `${company!.slug}-${new Date().getTime()}.png`,
          folder: company!.slug,
        });

        console.log(data);

        setValue('logo', data.url);
      } finally {
        setLoading(false);
      }
    },
  });

  const submitHandler = async (val: { logo: string }) => {
    if (isSubmitting) {
      return null;
    }

    try {
      await client.post('/company/onboarding/details', val);
      router.push('/admin/jobs');
    } catch (err) {
      console.log(err);
    }
  };

  const logo = watch('logo');
  console.log(logo)

  return (
    <OnboardingForm
      backUrl="/onboarding/culture"
      title="Upload your logo"
      description="Let’s get your branding through the system and make sure your posting are correct."
      onSubmit={handleSubmit(submitHandler)}
      isSubmitting={isSubmitting}
      disabled={!logo}
    >
      <div>
        {logo && (
          <div className="mx-auto mb-6 flex justify-center">
            <Image
              className="object-contain"
              src={logo}
              width={150}
              height={100}
              alt=""
            />
          </div>
        )}

        <div className="text-center">
          <Button as="label" {...getRootProps()} loading={loading}>
            <input {...getInputProps()} className="hidden" />
            {logo ? 'Re-upload logo' : 'Upload logo'}
          </Button>
        </div>
      </div>
    </OnboardingForm>
  );
}

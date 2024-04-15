'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/elements/button';
import { ImageUploader } from '@/components/modules/careers-page-form/image-uploader';
import { Input, Textarea } from '@/components/elements/input';
import {
  Control,
  UseFormRegister,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { CompanyService } from '@/base/services/company';
import { CompanyDetails } from '@/base/types/company';

const careersPageForm = z.object({
  title: z.string(),
  workplaceCulture: z.string(),
  companyMission: z.string(),
  companyBenefits: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  companyValues: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

type CareersPageProps = z.infer<typeof careersPageForm>;

interface CareersPageFormProps {
  company: CompanyDetails & {
    careersPage: CareersPageProps & {
      heroImages: string[];
      mediaGallery: string[];
    };
  };
}

export default function CareersPageForm({
  company: _company,
}: CareersPageFormProps) {
  const { careersPage, ...company } = _company;

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CareersPageProps>({
    defaultValues: async () => {
      return {
        title: careersPage.title,
        companyMission: careersPage.companyMission,
        workplaceCulture: careersPage.workplaceCulture,
        companyValues: Array.from({ length: 6 }).map((_, index) => ({
          value: careersPage?.companyValues[index]?.value,
        })),
        companyBenefits: Array.from({ length: 6 }).map((_, index) => ({
          value: careersPage?.companyBenefits[index]?.value,
        })),
      };
    },
  });

  const handleHeroImageUpload = async (heroImages: string[]) => {
    await CompanyService.updateCareersPage(company.id, { heroImages });
  };

  const handleMediaUpload = async (mediaGallery: string[]) => {
    await CompanyService.updateCareersPage(company.id, { mediaGallery });
  };

  const submitHandler = async (val: CareersPageProps) => {
    await CompanyService.updateCareersPage(company.id, val);
  };

  const pageUrl = `https://${company.slug}.${process.env.NEXT_PUBLIC_DOMAIN}`;

  return (
    <div className="container max-w-3xl pb-20">
      <h1 className="mb-6 text-2xl">Careers page</h1>

      <div className="mb-6">
        <div>
          Preview your careers page{' '}
          <a target="_blank" href={pageUrl} className="text-blue">
            {pageUrl}
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="card-container">
        <div className="flex items-center border-b px-10 py-6">
          <div className="font-inter text-2xl font-medium">Tell your story</div>

          <div className="ml-auto flex gap-4">
            <Button
              href={`/${company.slug}/careers`}
              target="_blank"
              variant="secondary"
            >
              Preview
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </div>

        <PageSection
          title="Hero images"
          description="Upload three images that helps portray your brand identity."
        >
          <ImageUploader
            count={3}
            folder="careers-page"
            images={careersPage?.heroImages}
            onChange={handleHeroImageUpload}
          />
        </PageSection>

        <PageSection title="Career page title">
          <Input
            {...register('title')}
            placeholder="e.g. “Careers at Nexuhm”"
          />
        </PageSection>

        <PageSection title="Company mission">
          <Input
            {...register('companyMission')}
            placeholder="e.g. “Be part of a world-class team, creating the best work of their lives.”"
          />
        </PageSection>

        <PageSection title="Workplace culture">
          <Textarea
            rows={6}
            {...register('workplaceCulture')}
            placeholder="e.g. “e.g. “At Nexuhm, above everything else, you get to be yourself. We’re a team of pioneering and inspired individuals, showing..."
          />
        </PageSection>

        <PageSection
          title="Media gallery"
          description="Upload images or videos about the workplace and what life's work like at your company. These will go side by side the workplace culture."
        >
          <ImageUploader
            count={6}
            folder="careers-page"
            images={careersPage?.mediaGallery}
            onChange={handleMediaUpload}
          />
        </PageSection>

        <PageSection
          title="Company values"
          description="Enter your top 5 company values to let people know. These will be added to all your job listings."
        >
          <CompanyValues register={register} control={control} />
        </PageSection>

        <PageSection
          title="Company benefits and perks"
          description="Add information about your company benefits and perks. These will be added to all your job listings."
        >
          <CompanyBenefits register={register} control={control} />
        </PageSection>
      </form>
    </div>
  );
}

function CompanyValues({
  register,
  control,
}: {
  register: UseFormRegister<any>;
  control: Control<CareersPageProps>;
}) {
  const { fields } = useFieldArray({
    name: 'companyValues',
    control,
    rules: {
      maxLength: 6,
    },
  });

  const placeholders = [
    'e.g. Be honest',
    'e.g. Stay human',
    'e.g. Show love',
    'e.g. Work wonders',
    'e.g. Trust and transparency',
  ];

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <Input
          key={field.id}
          placeholder={placeholders[index]}
          {...register(`companyValues.${index}.value`)}
        />
      ))}
    </div>
  );
}

function CompanyBenefits({
  register,
  control,
}: {
  register: UseFormRegister<any>;
  control: Control<CareersPageProps>;
}) {
  const { fields } = useFieldArray({
    name: 'companyBenefits',
    control,
    rules: {
      maxLength: 6,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <Input
          key={field.id}
          placeholder={`Perk #${index + 1}`}
          {...register(`companyBenefits.${index}.value`)}
        />
      ))}
    </div>
  );
}

interface PageSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function PageSection({ title, description, children }: PageSectionProps) {
  return (
    <div className="border-b px-10 py-6 last:border-0">
      <div className="mb-4">
        <div className="font-inter font-medium">{title}</div>
        {description && (
          <div className="mt-0.5 text-content-secondary">{description}</div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

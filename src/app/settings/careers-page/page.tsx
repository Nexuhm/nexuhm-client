'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/elements/button';
import { useList } from 'react-use';
import { ImageUploader } from '@/components/modules/careers-page-form/image-uploader';
import { Input, Textarea } from '@/components/elements/input';

export default function AccountPage() {
  const handleHeroImageUpload = (files: File[]) => {};

  const handleMediaUpload = (files: File[]) => {};

  return (
    <div className="container max-w-3xl pb-20">
      <h1 className="mb-6 text-2xl">Careers page</h1>

      <div className="mb-6">
        <a href="">Preview URL to go here</a>
      </div>

      <div className="card-container">
        <div className="flex items-center border-b px-10 py-6">
          <div className="font-inter text-2xl font-medium">Tell your story</div>

          <div className="ml-auto flex gap-4">
            <Button variant="secondary">Preview</Button>
            <Button>Save</Button>
          </div>
        </div>

        <PageSection
          title="Hero images"
          description="Upload three images that helps portray your brand identity."
        >
          <ImageUploader count={3} onUpload={handleHeroImageUpload} />
        </PageSection>

        <PageSection title="Career page title">
          <Input placeholder="e.g. “Careers at Nexuhm”" />
        </PageSection>

        <PageSection title="Company mission">
          <Input placeholder="e.g. “Be part of a world-class team, creating the best work of their lives.”" />
        </PageSection>

        <PageSection title="Workplace culture">
          <Textarea
            rows={6}
            placeholder="e.g. “e.g. “At Nexuhm, above everything else, you get to be yourself. We’re a team of pioneering and inspired individuals, showing..."
          />
        </PageSection>

        <PageSection
          title="Media gallery"
          description="Upload images or videos about the workplace and what life's work like at your company. These will go side by side the workplace culture."
        >
          <ImageUploader count={6} onUpload={handleMediaUpload} />
        </PageSection>

        <PageSection
          title="Company values"
          description="Enter your top 5 company values to let people know. These will be added to all your job listings."
        >
          <CompanyValues />
        </PageSection>

        <PageSection
          title="Company benefits and perks"
          description="Add information about your company benefits and perks. These will be added to all your job listings."
        >
          <CompanyBenefits />
        </PageSection>
      </div>
    </div>
  );
}

function CompanyValues() {
  const [list, { updateAt }] = useList<string>([]);

  const placeholders = [
    'e.g. Be honest',
    'e.g. Stay human',
    'e.g. Show love',
    'e.g. Work wonders',
    'e.g. Trust and transparency',
  ];

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Input
          key={index}
          value={list[index]}
          placeholder={placeholders[index]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateAt(index, e.target.value)
          }
        />
      ))}
    </div>
  );
}

function CompanyBenefits() {
  const [list, { updateAt }] = useList<string>([]);

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Input
          key={index}
          value={list[index]}
          placeholder={`Perk #${index + 1}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateAt(index, e.target.value)
          }
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

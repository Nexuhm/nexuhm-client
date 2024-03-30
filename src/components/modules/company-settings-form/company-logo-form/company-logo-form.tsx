'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CompanyLogoUploadDialog } from './company-logo-upload-dialog';
import { Button } from '@/components/elements/button';
import { CompanyLogoFormValues } from '@/base/schemas/company';

export function CompanyLogoForm({
  defaultValue,
  onSubmit,
}: {
  defaultValue: string;
  onSubmit: (val: CompanyLogoFormValues) => void;
}) {
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState<string>(defaultValue);

  return (
    <div className="p-6 card-container">
      <div className="mb-5">
        <div className="font-inter text-xl font-medium">Company Logo</div>
        <div className="text-sm text-content-secondary">
          Help people quickly know who you are
        </div>
      </div>

      <div className="">
        <div className="mb-4">
          <button
            onClick={() => setOpen(true)}
            className="relative overflow-hidden rounded-lg border px-4 py-1"
          >
            {picture ? (
              <Image
                src={picture}
                width={200}
                height={60}
                className="object-contain object-center"
                alt=""
              />
            ) : (
              <div className="flex h-full w-full items-center bg-surface-secondary p-3 text-center text-xs">
                Click to upload the logo
              </div>
            )}
          </button>
        </div>

        <div>
          <Button onClick={() => setOpen(true)}>Re-upload</Button>
        </div>

        <CompanyLogoUploadDialog
          open={open}
          onClose={() => setOpen(false)}
          onImageChange={async (logo) => {
            onSubmit({ logo });
            setPicture(logo);
            setOpen(false);
          }}
        />
      </div>
    </div>
  );
}

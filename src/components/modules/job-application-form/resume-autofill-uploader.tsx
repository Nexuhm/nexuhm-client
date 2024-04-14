import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import clsx from 'clsx';
import { useState } from 'react';

export interface ResumeAutofillUploaderProps {
  onUpload: (file: File) => void;
  loading?: boolean;
  value: any;
}

export function ResumeAutofillUploader({
  value,
  loading,
  onUpload,
}: ResumeAutofillUploaderProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="mb-8 flex flex-col gap-6 rounded-md border border-light-gray p-5">
      <div className="flex items-center gap-4">
        <div>
          <div className="font-medium">Autofill Apllication</div>

          <div className="text-sm text-content-tertiary">
            Save time by uploading your resume in one of the following formats:
            .pdf, .doc, .docx.˝
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button as="label" className="cursor-pointer" loading={loading}>
            {loading && 'Processing'}
            {!loading && (value ? 'Browse other' : 'Attach resume')}

            <input
              type="file"
              className="hidden"
              accept=".doc,.docx,.pdf"
              onChange={async (e) => {
                if (onUpload && e.target.files?.[0]) {
                  try {
                    await onUpload(e.target.files?.[0]);
                    setIsCompleted(true);
                  } catch (err) {}
                }
              }}
            />
          </Button>
        </div>
      </div>

      {isCompleted && (
        <div
          className={clsx(
            'rounded-xl border border-green bg-green bg-opacity-15',
            'animate-fade-in flex items-center justify-between gap-12 p-4 text-sm',
          )}
        >
          <p>
            Autofill completed! <br />
            Please review the information we have filled in below.
          </p>
          <button type="button" onClick={() => setIsCompleted(false)}>
            <Icon icon="close" className="w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

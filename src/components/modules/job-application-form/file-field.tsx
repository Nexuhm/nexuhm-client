'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/elements/icon';
import { Accept, useDropzone } from 'react-dropzone';
import { Spinner } from '@/components/elements/spinner';

export function FileField({
  label,
  required,
  error,
  value,
  accept,
  loading,
  onChange,
}: {
  name: string;
  label: ReactNode;
  value: File;
  required?: boolean;
  accept?: Accept;
  loading?: boolean;
  error?: string | boolean;
  onChange: (file: File | null) => void;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop: (files: File[]) => {
      if (files[0]) {
        onChange(files[0]);
      }
    },
  });

  return (
    <div>
      <div className="mb-1 flex items-center gap-1">
        <div className="input-label" data-required={required}>
          {label}
          {!required && (
            <span className="ml-1 text-content-tertiary">(Optional)</span>
          )}
        </div>

        <Icon icon="circled-question" className="w-5 text-content-tertiary" />
      </div>

      <div
        {...getRootProps()}
        className={clsx(
          'min-h-[132px] rounded-md border border-dashed border-light-gray p-4',
          'flex flex-col',
          'group cursor-pointer transition-all',
          !loading &&
            'hover:border-blue hover:border-opacity-50 hover:bg-light-blue',
          error && 'border-red',
        )}
      >
        <input {...getInputProps()} />

        {loading ? (
          <>
            <Spinner size={50} />
          </>
        ) : (
          <>
            {value ? (
              <FileTile file={value} onDelete={() => onChange(null)} />
            ) : (
              <div
                className={clsx(
                  'mx-auto mb-4 mt-auto flex h-14 w-14 items-center justify-center',
                  'rounded-full border border-transparent bg-light-blue text-blue',
                  'group-hover:border-blue group-hover:border-opacity-50',
                  'transition-all',
                )}
              >
                <Icon icon="upload" />
              </div>
            )}

            <div className="mt-auto text-center">
              <span className="text-blue">Replace file</span> or drag and drop
              here
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FileTile({ file, onDelete }: { file: File; onDelete: () => void }) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-md p-2',
        'border border-transparent bg-surface-secondary',
        'group-hover:border-blue group-hover:border-opacity-15',
      )}
    >
      <Icon icon="attachment" className="w-5 text-content-tertiary" />
      <div className="line-clamp-2 text-sm text-content-secondary">
        {file.name}
      </div>
      <div className="ml-auto inline-flex items-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Icon icon="trash" className="w-6 text-content-tertiary" />
        </button>
      </div>
    </div>
  );
}

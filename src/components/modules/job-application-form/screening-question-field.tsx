'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/elements/input';
import { FileField } from './file-field';
import { ScreeningQuestion } from '@/base/types/jobs';
import { MediaService } from '@/base/services/media';

interface ScreeningQuestionFieldProps extends ScreeningQuestion {
  value?: string;
  onChange: (val: string) => void;
}

export function ScreeningQuestionField({
  type,
  title,
  value,
  onChange,
}: ScreeningQuestionFieldProps) {
  if (type === 'text') {
    return (
      <div>
        <Input
          value={value as string}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          variant="gray"
          label={title}
          placeholder="Type your answer..."
          required
        />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <ScreeningVideoQuestionField
        title={title}
        onChange={(file) => onChange(file)}
      />
    );
  }
}

interface ScreeningVideoQuestionFieldProps {
  title: string;
  onChange: (file: string) => void;
}

function ScreeningVideoQuestionField({
  title,
  onChange,
}: ScreeningVideoQuestionFieldProps) {
  const [value, setValue] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File | null) => {
    if (!file) {
      return null;
    }

    setLoading(true);

    try {
      const res = await await MediaService.upload(file, {
        filename: file.name,
        folder: 'screening-questions',
      });

      console.log(res);

      onChange(res.url);
    } catch (err) {}

    setLoading(false);
  };

  useEffect(() => {
    if (value) {
      handleUpload(value);
    }
  }, [value]);

  return (
    <FileField
      label={title}
      loading={loading}
      onChange={setValue}
      value={value}
      accept={{
        'video/mp4': ['.mp4'],
        'video/avi': ['.avi'],
        'video/mpeg': ['.mpeg'],
        'video/quicktime': ['.mov'],
      }}
    />
  );
}

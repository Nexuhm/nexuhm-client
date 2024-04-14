'use client';

import { useRef } from 'react';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import { useHoverDirty } from 'react-use';
import { ScreeningQuestion } from '@/base/types/jobs';

interface ScreeningQuestionInputProps {
  onDelete: () => void;
  onChange: (val: ScreeningQuestion) => void;
  value: ScreeningQuestion;
  index: number;
}

export function ScreeningQuestionInput({
  value,
  index,
  onChange,
  onDelete,
}: ScreeningQuestionInputProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHoverDirty(ref);

  return (
    <div className="flex gap-4" ref={ref}>
      <div className="w-full max-w-md">
        <Input
          required
          label={`${index + 1}. Question Title`}
          value={value.title}
          placeholder="Tell your main strength for the job"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...value, title: e.target.value })
          }
        />
      </div>

      <div>
        <label className="input-label">Type</label>

        <div className="flex gap-3">
          <Button
            variant={value.type === 'text' ? 'primary' : 'secondary'}
            ghost
            onClick={() => onChange({ ...value, type: 'text' })}
          >
            Text Field
          </Button>
          <Button
            ghost
            variant={value.type === 'video' ? 'primary' : 'secondary'}
            onClick={() => onChange({ ...value, type: 'video' })}
          >
            Video
          </Button>

          {isHovering && (
            <button
              type="button"
              className="animate-fade-in text-content-tertiary transition-all hover:text-red"
              onClick={onDelete}
            >
              <Icon icon="trash" className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

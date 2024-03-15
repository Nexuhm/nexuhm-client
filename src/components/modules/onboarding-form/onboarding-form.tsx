import { Icon } from '@/components/elements/icon';
import { Button } from '@/components/elements/button';
import { Spinner } from '@/components/elements/spinner';
import { FormEvent, PropsWithChildren } from 'react';

interface OnboardingFormProps extends PropsWithChildren {
  onSubmit: (e: FormEvent) => void;
  skipUrl?: string;
  backUrl?: string;
  title: string;
  description: string;
  isSubmitting?: boolean;
  disabled?: boolean;
}

export function OnboardingForm({
  onSubmit,
  title,
  description,
  skipUrl,
  backUrl,
  disabled,
  isSubmitting,
  children,
}: OnboardingFormProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        {backUrl && (
          <a href={backUrl}>
            <Icon icon="arrow-left" className="h-8 w-8" />
          </a>
        )}

        {skipUrl && (
          <a href={skipUrl} className="underline">
            Skip
          </a>
        )}
      </div>

      <div className="mb-6">
        <div className="mb-1 font-inter text-3xl font-semibold">{title}</div>
        <div className="font-inter text-sm">{description}</div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 lg:mb-44">{children}</div>

        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            className="w-72"
            disabled={isSubmitting || disabled}
          >
            Continue
            {isSubmitting && (
              <Spinner color="white" className="ml-2" size={20} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

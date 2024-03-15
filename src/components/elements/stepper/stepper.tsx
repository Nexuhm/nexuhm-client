import clsx from 'clsx';
import styles from './stepper.module.scss';
import { Fragment } from 'react';

export interface StepProps {
  title: string;
}

export interface StepperProps {
  activeStep: number;
  steps: StepProps[];
  className?: string;
  onStepChange?: (val: number) => void;
}

export function Stepper({
  steps,
  onStepChange,
  activeStep,
  className,
}: StepperProps) {
  return (
    <div className={clsx(className, 'flex w-full pb-6')}>
      {steps.map(({ title }, index) => {
        const step = index + 1;
        return (
          <Fragment key={index}>
            <div
              className={clsx(styles.stepContainer, {
                [styles.activeStep]: activeStep === step,
              })}
            >
              <button
                onClick={() => onStepChange?.(step)}
                className="flex flex-col items-center"
                disabled={step >= activeStep}
              >
                <span className={styles.stepNumber}>{step}</span>
                <span className="absolute top-8 text-nowrap">{title}</span>
              </button>
            </div>

            {steps.length - 1 > index && <div className={styles.stepLine} />}
          </Fragment>
        );
      })}
    </div>
  );
}

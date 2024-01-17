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
}

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <div className={clsx(className, 'flex w-full pb-6')}>
      {steps.map(({ title }, index) => (
        <Fragment key={index}>
          <div
            className={clsx(styles.stepContainer, {
              [styles.activeStep]: activeStep === index + 1,
            })}
          >
            <div className="flex flex-col items-center">
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className="absolute top-8 text-nowrap">{title}</span>
            </div>
          </div>

          {steps.length - 1 > index && <div className={styles.stepLine} />}
        </Fragment>
      ))}
    </div>
  );
}

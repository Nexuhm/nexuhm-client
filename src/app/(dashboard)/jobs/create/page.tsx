'use client';

import { Button, IconButton } from '@/components/elements/button';
import { Input, Textarea } from '@/components/elements/input';
import { Stepper } from '@/components/elements/stepper/stepper';
import { JobCreateForm } from '@/components/modules/job-create-form';
import { JobGenerationForm } from '@/components/modules/job-generation-form';
import { useState } from 'react';

export default function JobCreatePage() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      title: 'Generate job',
    },
    {
      title: 'Preivew',
    },
    {
      title: 'Publish',
    },
  ];

  return (
    <div className="container max-w-6xl">
      <div className="mb-6 flex items-center">
        <div className="text-3xl font-medium">Create a job</div>

        <div className="ml-auto flex gap-4">
          <IconButton variant="secondary" icon="close" />
        </div>
      </div>

      <Stepper
        className="mx-auto mb-16 max-w-xl"
        activeStep={activeStep}
        steps={steps}
      />

      <JobGenerationForm />
    </div>
  );
}

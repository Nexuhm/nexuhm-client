'use client';

import { useState } from 'react';
import { JobSchema } from '@/base/types/jobs';
import { IconButton } from '@/components/elements/button';
import { Stepper } from '@/components/elements/stepper/stepper';
import { JobCreateForm } from '@/components/modules/job-create-form';
import { JobGenerationForm } from '@/components/modules/job-generation-form';
import { marked } from 'marked';
import styles from '@/components/elements/rich-text-editor/rich-text-editor.module.scss';

export default function JobCreatePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [jobPosting, setJobPosting] = useState<JobSchema>();

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

  const handleStepChange = (step: number) => (result: JobSchema) => {
    window.scrollTo({
      top: 0,
    });
    setJobPosting(result);
    setActiveStep(step);
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1: {
        return <JobGenerationForm onComplete={handleStepChange(2)} />;
      }
      case 2: {
        return (
          <JobCreateForm
            onSubmit={handleStepChange(3)}
            defaultValues={jobPosting}
          />
        );
      }
      case 3: {
        const html = marked(jobPosting?.content);
        return (
          <div className="mx-auto max-w-3xl p-10 card-container">
            <div
              className={styles.editorContent}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        );
      }
    }
  };

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
        onStepChange={setActiveStep}
      />

      <div className="mb-10 text-center">
        <div className="mb-2 text-2xl leading-10">Nexuhm AI</div>
        <div className="leading-6">
          Generate your job description with ease.
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

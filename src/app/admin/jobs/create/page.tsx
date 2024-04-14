'use client';

import { useState } from 'react';
import { JobSchema } from '@/base/types/jobs';
import { Button, IconButton } from '@/components/elements/button';
import { Stepper } from '@/components/elements/stepper/stepper';
import { JobDetailsForm } from '@/components/modules/job-details-form';
import { JobGenerationForm } from '@/components/modules/job-generation-form';
import { createJobDraft } from '@/base/actions/jobs';
import { JobPreview } from '@/components/modules/job-preview';
import { useSetState } from 'react-use';
import { Icon } from '@/components/elements/icon';
import { JobCreateForm } from './job-create-form';

export default function JobCreatePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [jobPosting, setJobPosting] = useState<JobSchema>();
  const [state, setState] = useSetState({
    isLoading: false,
    isPublished: false,
  });

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

  const handleStepChange = (step: number) => (result?: JobSchema) => {
    window.scrollTo({
      top: 0,
    });

    if (result) {
      setJobPosting(result);
    }

    setActiveStep(step);
  };

  const handleCreate = async () => {
    setState({
      isLoading: true,
    });

    try {
      const res = await createJobDraft(jobPosting!);

      if (!res.ok) {
        const data = await res.text();
        throw Error(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setState({
        isLoading: false,
      });
    }

    setState({
      isPublished: true,
    });
  };

  const renderContent = () => {
    if (state.isPublished) {
      return (
        <div className="mt-20 flex flex-col items-center gap-2">
          <Icon icon="circled-check" className="h-16 w-16" />
          <div>Job published</div>
          <Button href="/admin/jobs">View Job</Button>
        </div>
      );
    }

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
        if (!jobPosting) {
          return null;
        }

        return <JobPreview data={jobPosting} />;
      }
    }
  };

  return (
    <div className="container max-w-6xl">
      <div className="mb-6 flex items-center">
        <div className="text-3xl font-medium">Create a job</div>

        <div className="ml-auto flex gap-4">
          {activeStep === 3 && !state.isPublished && (
            <>
              <Button variant="secondary" disabled={state.isLoading}>
                Save Draft
              </Button>
              <Button
                variant="green"
                onClick={handleCreate}
                disabled={state.isLoading}
              >
                Save & Continue
              </Button>
            </>
          )}

          <IconButton variant="secondary" icon="close" />
        </div>
      </div>

      <Stepper
        className="mx-auto mb-16 max-w-xl"
        activeStep={activeStep}
        steps={steps}
        onStepChange={setActiveStep}
      />

      <div className="mb-10 flex flex-col gap-2 text-center font-medium">
        <div className="text-2xl">Nexuhm AI</div>
        <div className="text-content-secondary">
          Generate your job description with ease.
        </div>

        {activeStep > 1 && (
          <div>
            <button
              className="text-content-tertiary underline underline-offset-[3px]"
              onClick={() => setActiveStep(1)}
            >
              Regenrate job
            </button>
          </div>
        )}
      </div>

      {renderContent()}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { JobSchema } from '@/base/types/jobs';
import { Button, IconButton } from '@/components/elements/button';
import { Stepper } from '@/components/elements/stepper/stepper';
import { JobCreateForm } from '@/components/modules/job-create-form';
import { JobGenerationForm } from '@/components/modules/job-generation-form';
import { createJobDraft } from '@/base/actions/jobs';
import { JobPreview } from '@/components/modules/job-preview';
import { useSetState } from 'react-use';
import { Icon } from '@/components/elements/icon';

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

  const handleSave = async () => {
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
          <Button href="/jobs">View Job</Button>
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

        return (
          <JobPreview
            loading={state.isLoading}
            onSave={handleSave}
            data={jobPosting}
          />
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

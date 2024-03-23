'use client';

import { useState } from 'react';
import { Button } from '@/components/elements/button';
import { Dialog } from '@/components/elements/dialog';
import { Select, Textarea } from '@/components/elements/input';
import { Form } from '@/components/modules/form/form';
import { Controller, useForm } from 'react-hook-form';
import { client } from '@/base/services/clients/browser-client';
import { StageActionProps } from './types';

interface FormValues {
  impression: string;
  strengthsAndWeaknesses: string;
  roleCompatibility: string;
  recommendation: string;
}

export function SubmitFeedbackAction({
  candidateId,
  onComplete,
}: StageActionProps) {
  const [open, setOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const submitHandler = async (val: FormValues) => {
    await client.post(`/admin/candidates/${candidateId}/feedback`, val);
    await onComplete();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Submit Feedback</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-sm"
      >
        <Dialog.Title>Submit Feedback</Dialog.Title>
        <Dialog.Content>
          <p className="mb-4">
            Please provide your feedback for this candidate's interview. This
            will be kept in the notes for future reading.
          </p>

          <Form id="feedback-form" onSubmit={handleSubmit(submitHandler)}>
            <Form.ControlGroup label="Overall Impression">
              <Controller
                name="impression"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    className="flex-1"
                    placeholder="Select option"
                    onChange={(val) => field.onChange(val)}
                    options={[
                      {
                        value: 'positive',
                        label: 'Positive',
                      },
                      {
                        value: 'neutral',
                        label: 'Neutral',
                      },
                      {
                        value: 'negative',
                        label: 'Negative',
                      },
                    ]}
                  />
                )}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Key Strengths and Weaknesses">
              <Textarea
                rows={4}
                className="w-full"
                {...register('strengthsAndWeaknesses', { required: true })}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Fit for the Role">
              <Controller
                name="roleCompatibility"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    className="flex-1"
                    placeholder="Select option"
                    onChange={(val) => field.onChange(val)}
                    options={[
                      {
                        value: 'good-fit',
                        label: 'Good Fit',
                      },
                      {
                        value: 'unsure',
                        label: 'Unsure',
                      },
                      {
                        value: 'not-fit',
                        label: 'Not a Fit',
                      },
                    ]}
                  />
                )}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Recommendation">
              <Controller
                name="recommendation"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    className="flex-1"
                    placeholder="Select option"
                    onChange={(val) => field.onChange(val)}
                    options={[
                      {
                        value: 'move-to-next-step',
                        label: 'Moved to Next Step',
                      },
                      {
                        value: 'need-more-information',
                        label: 'Need More Information',
                      },
                      {
                        value: 'reject',
                        label: 'Reject',
                      },
                    ]}
                  />
                )}
              />
            </Form.ControlGroup>
          </Form>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            variant="link"
            className="mr-2"
            loading={isSubmitting}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            form="feedback-form"
            type="submit"
            loading={isSubmitting}
          >
            Submit Feedback
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/elements/button';
import { Dialog } from '@/components/elements/dialog';
import { Input } from '@/components/elements/input';
import { Form } from '@/components/modules/form/form';
import { useForm } from 'react-hook-form';
import { client } from '@/base/services/clients/browser-client';
import { StageActionProps } from './types';

interface FormValues {
  positionTitle: string;
  startDate: string;
  salary: string;
  benefits: string;
}

export function ConfirmHireAction({
  candidateId,
  onComplete,
}: StageActionProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const submitHandler = async (val: FormValues) => {
    await client.post(`/admin/candidates/${candidateId}/hire`, val);
    await onComplete();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Confirm Hire</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-sm"
      >
        <Dialog.Title>Confirm Hire</Dialog.Title>
        <Dialog.Content>
          <p className="mb-4">
            You're about to extend an offer to this candidate. Please confirm
            the details. You should send an email after this step.
          </p>

          <Form
            id="hire-form"
            onSubmit={handleSubmit(submitHandler)}
            className="mb-4"
          >
            <Form.ControlGroup label="Position title">
              <Input
                className="w-full"
                {...register('positionTitle', { required: true })}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Start Date">
              <Input
                type="date"
                className="w-full"
                {...register('startDate', { required: true })}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Salary">
              <Input
                className="w-full"
                {...register('salary', { required: true })}
              />
            </Form.ControlGroup>
          </Form>

          <div className="text-sm">
            Please move this candidate into your HR software to onboard into
            your company. If you don’t have a HR system, reach out to the
            candidate.
          </div>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            variant="link"
            className="mr-2"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            form="hire-form"
            type="submit"
            loading={isSubmitting}
          >
            Confirm Hire
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

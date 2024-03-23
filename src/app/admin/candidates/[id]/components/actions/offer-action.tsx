'use client';

import { useState } from 'react';
import { Button } from '@/components/elements/button';
import { Dialog } from '@/components/elements/dialog';
import { Input, Textarea } from '@/components/elements/input';
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

export function OfferFeedbackAction({
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
    await client.post(`/admin/candidates/${candidateId}/offer`, val);
    await onComplete();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Offer</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-sm"
      >
        <Dialog.Title>Offer</Dialog.Title>
        <Dialog.Content>
          <p className="mb-4">
            You're about to extend an offer to this candidate. Please confirm
            the details. You should send an email after this step.
          </p>

          <Form id="offer-form" onSubmit={handleSubmit(submitHandler)}>
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

            <Form.ControlGroup label="Benefits overview">
              <Textarea
                rows={4}
                className="w-full"
                {...register('benefits', { required: true })}
              />
            </Form.ControlGroup>
          </Form>
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
            form="offer-form"
            type="submit"
            loading={isSubmitting}
          >
            Offer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

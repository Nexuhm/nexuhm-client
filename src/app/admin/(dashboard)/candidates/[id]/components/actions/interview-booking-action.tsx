'use client';

import { useState } from 'react';
import { Button } from '@/components/elements/button';
import { Dialog } from '@/components/elements/dialog';
import { Input, Textarea } from '@/components/elements/input';
import { Form } from '@/components/modules/form/form';
import { ComboboxSelect } from '@/components/elements/input/combobox';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Icon } from '@/components/elements/icon';
import timezones from '@/base/utils/timezones.json';
import { client } from '@/base/services/clients/browser-client';
import { StageActionProps } from './types';

interface FormValues {
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  interviewers: Array<{
    email: string;
  }>;
  location: string;
  message: string;
}

export function InterviewBookAction({
  candidateId,
  onComplete,
}: StageActionProps) {
  const [open, setOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interviewers',
  });

  const submitHandler = async (val: FormValues) => {
    await client.post(`/admin/candidates/${candidateId}/interview`, {
      ...val,
      interviewers: val.interviewers.map((i) => i.email),
    });

    await onComplete();

    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Book Interview</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-sm"
      >
        <Dialog.Title>Book Interview</Dialog.Title>
        <Dialog.Content>
          <p className="mb-4">
            You are about to move this candidate to the interview stage.
          </p>

          <Form id="booking-form" onSubmit={handleSubmit(submitHandler)}>
            <Form.ControlGroup label="Date">
              <Input
                type="date"
                className="flex-1"
                {...register('date', { required: true })}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Start and end times">
              <Input
                type="time"
                className="flex-1"
                {...register('startTime', { required: true })}
              />
              <Input
                type="time"
                className="flex-1"
                {...register('endTime', { required: true })}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Timezone">
              <Controller
                name="timezone"
                control={control}
                render={({ field }) => (
                  <ComboboxSelect
                    value={field.value}
                    className="flex-1"
                    placeholder="Set timezone"
                    onChange={(val) => field.onChange(val)}
                    options={timezones}
                  />
                )}
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Interviewers">
              <div className="flex-1">
                <Input
                  type="email"
                  className="w-full"
                  placeholder="Search or find people to add"
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const target: any = e.target;
                      const values = getValues();
                      const exists = values.interviewers?.some(
                        (i) => i.email === target.value,
                      );

                      if (!exists) {
                        append({
                          email: target.value,
                        });
                      }

                      e.target.value = '';
                    }
                  }}
                />

                {fields.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1">
                    {fields.map((val, index) => (
                      <div className="flex items-center gap-1 rounded-lg border bg-light-blue text-sm">
                        <button onClick={() => remove(index)} className="p-1">
                          <Icon icon="close" className="h-4 w-4" />
                        </button>
                        {val.email}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.ControlGroup>

            <Form.ControlGroup label="Location">
              <Input
                placeholder="Type location, or paste online meeting link"
                className="w-full"
              />
            </Form.ControlGroup>

            <Form.ControlGroup label="Format">
              <Textarea
                rows={4}
                className="w-full"
                placeholder="If you want to prep the Candidate with a specific format please specify here."
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
            form="booking-form"
            type="submit"
            loading={isSubmitting}
          >
            Book Interview
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
}

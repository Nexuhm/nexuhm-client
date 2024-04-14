'use client';

import {
  EmploymentType,
  JobSchema,
  jobSchema,
  salaryFrequencySchema,
} from '@/base/types/jobs';
import { Button } from '@/components/elements/button';
import { Input, Textarea, Select } from '@/components/elements/input';
import { InputWrapper } from '@/components/elements/input/input-wrapper';
import { RichTextEditor } from '@/components/elements/rich-text-editor';
import { FormControlGroup } from '@/components/modules/job-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Form } from '../form';
import { ScreeningQuestionInput } from './screening-question-input';

export interface JobDetailsFormBase {
  defaultValues?: Partial<JobSchema>;
  onSubmit: (val: JobSchema) => void;
}

interface JobDetailsFormProps extends JobDetailsFormBase {
  id: string;
}

export function JobDetailsForm({
  id,
  defaultValues,
  onSubmit,
}: JobDetailsFormProps) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JobSchema>({
    defaultValues,
    resolver: zodResolver(jobSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'screeningQuestions',
  });

  console.log(errors, isValid);

  const submitHandler = async (val: any) => {
    onSubmit(val);
  };

  return (
    <Form
      id={id}
      onSubmit={handleSubmit(submitHandler)}
      className="mx-auto max-w-[800px] gap-6 p-10 pt-4"
    >
      <div className="mb-4 text-2xl font-medium">Tell us about your job</div>

      <div className="p-6 card-container">
        <div className="mb-2 text-2xl font-medium">
          Job title and description
        </div>

        <Input
          label="Job Title"
          {...register('title', { required: true })}
          placeholder="e.g. Senior product Designer"
          className="mb-4 w-full"
          required
        />

        <Textarea
          label="About the role"
          rows={10}
          {...register('description', { required: true })}
          placeholder={
            'e.g. We’re looking for a full-time senior product designer' +
            'with 6-8 years experience in product design and leadership.' +
            'This position is located in New York City.'
          }
          required
        />
      </div>

      <div className="p-6 card-container">
        <div className="mb-2 text-2xl font-medium">Job Description</div>

        <FormControlGroup>
          <Controller
            control={control}
            name="content"
            render={({ field }) => {
              return (
                <RichTextEditor
                  label="Job description"
                  initialValue={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                  }}
                />
              );
            }}
          />
        </FormControlGroup>
      </div>

      <div className="p-6 card-container">
        <div className="mb-4 text-2xl font-medium">Location</div>

        <FormControlGroup>
          <Input
            label="Office location"
            {...register('location', { required: true })}
            rows={10}
            placeholder={'e.g. “London” or “Liverpool”'}
            required
          />
        </FormControlGroup>
      </div>

      <div className="p-6 card-container">
        <FormControlGroup>
          <Controller
            control={control}
            name="employmentType"
            render={({ field }) => (
              <Select
                required
                label="Employment type"
                value={field.value}
                onChange={(val: EmploymentType) =>
                  setValue('employmentType', val)
                }
                options={[
                  {
                    label: 'Full-Time Employment',
                    value: 'full-time-employment',
                  },
                  {
                    label: 'Part-Time Employment',
                    value: 'part-time-employment',
                  },
                  { label: 'Freelance', value: 'freelance' },
                  { label: 'Contractual', value: 'contractual' },
                  {
                    label: 'Temporary Employment',
                    value: 'temporary-employment',
                  },
                  { label: 'Internship', value: 'internship' },
                  { label: 'Volunteer Work', value: 'volunteer-work' },
                  { label: 'Seasonal Work', value: 'seasonal-work' },
                ]}
                placeholder='e.g. "Full-time" and "Part-time"'
              />
            )}
          />
        </FormControlGroup>
      </div>

      <div className="p-6 card-container">
        <div className="mb-4 text-2xl font-medium">Salary</div>

        <Form.ControlGroup className="gap-4">
          <Form.ControlGroup label="Currency" className="flex-1">
            <Controller
              control={control}
              name="salary.currency"
              render={({ field }) => (
                <Select
                  className="flex-1"
                  placeholder="Choose a currency"
                  value={field.value}
                  onChange={(val) => setValue('salary.currency', val)}
                  options={[
                    {
                      label: '£ GPB',
                      value: 'GPB',
                    },
                    {
                      label: '$ USD',
                      value: 'USD',
                    },
                    {
                      label: '€ EUR',
                      value: 'EUR',
                    },
                  ]}
                />
              )}
            />
          </Form.ControlGroup>

          <Form.ControlGroup label="Salary range" className="flex-1">
            <div className="flex gap-2">
              <Controller
                control={control}
                name="salary.min"
                defaultValue={0}
                render={({ field }) => (
                  <InputWrapper className="flex-1">
                    <NumericFormat
                      required
                      placeholder="to"
                      value={field.value}
                      thousandSeparator=","
                      onChange={field.onChange}
                    />
                  </InputWrapper>
                )}
              />

              <Controller
                control={control}
                name="salary.max"
                defaultValue={0}
                render={({ field }) => (
                  <InputWrapper className="flex-1">
                    <NumericFormat
                      required
                      placeholder="to"
                      thousandSeparator=","
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </InputWrapper>
                )}
              />
            </div>
          </Form.ControlGroup>

          <Form.ControlGroup label="Time frame" className="flex-1">
            <Controller
              control={control}
              name="salary.frequency"
              render={({ field }) => (
                <Select
                  className="flex-1"
                  placeholder="Choose an option"
                  value={field.value}
                  onChange={(val) => setValue('salary.frequency', val)}
                  options={[
                    {
                      label: 'Yearly',
                      value: salaryFrequencySchema.Enum.yearly,
                    },
                    {
                      label: 'Monthly',
                      value: salaryFrequencySchema.Enum.monthly,
                    },
                    {
                      label: 'Weekly',
                      value: salaryFrequencySchema.Enum.weekly,
                    },
                  ]}
                />
              )}
            />
          </Form.ControlGroup>
        </Form.ControlGroup>
      </div>

      <div className="p-6 card-container">
        <div className="mb-4 text-2xl font-medium">Screening Questions</div>

        <div className="flex flex-col gap-4">
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <ScreeningQuestionInput
                key={index}
                value={field}
                index={index}
                onDelete={() => remove(index)}
                onChange={(value) => update(index, value)}
              />
            ))
          ) : (
            <div className="mx-auto max-w-lg text-center text-content-tertiary">
              Add custom screening questions to your process here. All questions
              will be required by the candidate
            </div>
          )}

          <div className="text-center">
            <Button onClick={() => append({ type: 'text', title: '' })}>
              Add question
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

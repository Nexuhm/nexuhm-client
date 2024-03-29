'use client';

import {
  EmploymentType,
  JobSchema,
  jobSchema,
  salaryFrequencySchema,
} from '@/base/types/jobs';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input, Textarea, Select } from '@/components/elements/input';
import { InputWrapper } from '@/components/elements/input/input-wrapper';
import { RichTextEditor } from '@/components/elements/rich-text-editor';
import { FormControlGroup } from '@/components/modules/job-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Form } from '../form/form';

interface JobCreateFormProps {
  defaultValues?: Partial<JobSchema>;
  onPreview: (val: JobSchema) => void;
}

export function JobCreateForm({
  defaultValues,
  onPreview,
}: JobCreateFormProps) {
  const { register, setValue, control, handleSubmit } = useForm<JobSchema>({
    defaultValues,
    resolver: zodResolver(jobSchema),
  });

  const submitHandler = async (val: any) => {
    onPreview(val);
  };

  return (
    <Form
      onSubmit={handleSubmit(submitHandler)}
      className="mx-auto max-w-[800px] gap-6 p-10 pt-4"
    >
      <div className="mb-4 text-2xl font-medium">Tell us about your job</div>

      <div className="p-6 card-container">
        <div className="mb-2 text-2xl font-medium">
          Job title and Department details
        </div>

        <Form.ControlGroup className="mb-4">
          <Input
            label="Job Title"
            {...register('title', { required: true })}
            placeholder="e.g. Senior product Designer"
            className="w-full"
            required
          />
        </Form.ControlGroup>

        <Form.ControlGroup>
          <Input
            label="Department"
            {...register('department', { required: true })}
            placeholder="e.g. Senior product Designer"
            className="w-full"
            required
          />

          <Input
            label="Job Code"
            {...register('code', { required: true })}
            placeholder="e.g. #1234"
            className="w-full"
            required
          />
        </Form.ControlGroup>
      </div>

      <div className="p-6 card-container">
        <div className="mb-2 text-2xl font-medium">Description</div>

        <FormControlGroup>
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
        </FormControlGroup>
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

      <div className="mb-6 p-6 card-container">
        <div className="mb-4 text-2xl font-medium">Salary</div>

        <Form.ControlGroup>
          <Form.ControlGroup label="Salary range" className="flex-1">
            <div className="flex gap-4">
              <Controller
                control={control}
                name="salary.min"
                defaultValue={0}
                render={({ field }) => (
                  <InputWrapper prefix="£" className="flex-1">
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
                  <InputWrapper prefix="£" className="flex-1">
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
                  placeholder="e.g. Choose an option"
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

      <div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">
            <Icon icon="check" className="2-5 h-5" />
            Preview
          </Button>
        </div>
      </div>
    </Form>
  );
}

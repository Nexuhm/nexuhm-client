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
import { NumberFormatValues, NumericFormat } from 'react-number-format';

interface JobCreateFormProps {
  defaultValues?: Partial<JobSchema>;
  onSubmit: (val: JobSchema) => void;
}

export function JobCreateForm({ defaultValues, onSubmit }: JobCreateFormProps) {
  const { register, setValue, control, handleSubmit } = useForm<JobSchema>({
    defaultValues,
    resolver: zodResolver(jobSchema),
  });

  const submitHandler = async (val: any) => {
    onSubmit(val);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mx-auto max-w-[800px] p-10 card-container"
    >
      <div className="mb-8 text-2xl font-medium">Tell us about your job</div>

      <FormControlGroup>
        <Input
          label="Job Title"
          {...register('title', { required: true })}
          placeholder="e.g. Senior product Designer"
          required
        />
      </FormControlGroup>

      <FormControlGroup>
        <Textarea
          label="Job overview"
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

      <FormControlGroup>
        <Input
          label="Job location"
          {...register('location', { required: true })}
          rows={10}
          placeholder={'e.g. “London” or “Liverpool”'}
          required
        />
      </FormControlGroup>

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

      <FormControlGroup label="Salary range" required>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="salary.min"
            defaultValue={0}
            render={({ field }) => (
              <InputWrapper prefix="£" className="flex-1">
                <NumericFormat
                  required
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
                  thousandSeparator=","
                  value={field.value}
                  onChange={field.onChange}
                />
              </InputWrapper>
            )}
          />
        </div>
      </FormControlGroup>

      <FormControlGroup>
        <Controller
          control={control}
          name="salary.frequency"
          render={({ field }) => (
            <Select
              required
              className="flex-1"
              label="How often"
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
      </FormControlGroup>

      <FormControlGroup label="Company benefits">
        <div className="mb-3 leading-6">
          If you want to customise your company benefits please go to your
          company page. This is included at the bottom of all your job pages.
        </div>

        <div className="flex-shrink-0">
          <Button variant="secondary">
            <Icon icon="edit" className="mr-1 h-5 w-5" />
            Go to Company details
          </Button>
        </div>
      </FormControlGroup>

      <div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="secondary">
            <Icon icon="edit" className="2-5 h-5" />
            Save draft
          </Button>
          <Button type="submit">
            <Icon icon="check" className="2-5 h-5" />
            Preview
          </Button>
        </div>
      </div>
    </form>
  );
}

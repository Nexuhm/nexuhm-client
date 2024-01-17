'use client';

import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input, Textarea, Select } from '@/components/elements/input';
import { RichTextEditor } from '@/components/elements/rich-text-editor';
import { FormControlGroup, FormSection } from '@/components/modules/job-form';
import { EditorState } from 'lexical';
import { useForm, Controller } from 'react-hook-form';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import { z } from 'zod';

const employmentTypeSchema = z.enum([
  'full-time-employment',
  'part-time-employment',
  'freelance',
  'contractual',
  'temporary-employment',
  'internship',
  'volunteer-work',
  'seasonal-work',
]);

const salaryFrequencySchema = z.enum(['weekly', 'monthly', 'yearly']);

const jobSchema = z.object({
  title: z.string(),
  overview: z.string(),
  content: z.any(), // Use the defined schema for the description
  location: z.string(),
  salary: z.number(),
  salaryFrequency: salaryFrequencySchema,
  employmentType: employmentTypeSchema,
});

type JobSchema = z.infer<typeof jobSchema>;

type EmploymentType = z.infer<typeof employmentTypeSchema>;

export function JobCreateForm() {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JobSchema>();

  const submitHandler = async (val: any) => {
    console.log(val);
  };

  const handleRichTextChange = (state: EditorState) => {
    setValue('content', state.toJSON());
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="card-container">
      <FormSection>
        <div className="text-2xl font-medium">Tell us about your job</div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary">Preview</Button>
          <Button type="submit" variant="secondary">
            <Icon icon="edit" className="2-5 h-5" />
            Save draft
          </Button>
          <Button>
            <Icon icon="check" className="2-5 h-5" />
            Publish
          </Button>
        </div>
      </FormSection>

      <FormControlGroup
        title="Job Title"
        description="What is the title of this job?"
        required
      >
        <Input
          {...register('title', { required: true })}
          placeholder="e.g. Senior product Designer"
        />
      </FormControlGroup>

      <FormControlGroup
        title="Job overview"
        description="Provide a short description about your company, what you’re looking for and about the job."
        required
      >
        <Textarea
          rows={10}
          {...register('overview', { required: true })}
          placeholder={
            'e.g. We’re looking for a full-time senior product designer' +
            'with 6-8 years experience in product design and leadership.' +
            'This position is located in New York City.'
          }
        />
      </FormControlGroup>

      <FormControlGroup
        title="Job description"
        description={
          'Provide a description about your company, \
            what you’re looking for and a short description about the job.'
        }
        required
      >
        <RichTextEditor onChange={handleRichTextChange} />
      </FormControlGroup>

      <FormControlGroup
        title="Job location"
        description="Where will they work. If left blank location will be set to “Remote”"
        required
      >
        <Input
          {...register('location', { required: true })}
          rows={10}
          placeholder={'e.g. “London” or “Liverpool”'}
        />
      </FormControlGroup>

      <FormControlGroup
        title="Employment type"
        description={'Why type of employment is this job?'}
        required
      >
        <Controller
          control={control}
          name="employmentType"
          render={({ field }) => (
            <Select
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

      <FormControlGroup
        title="Salary"
        description={'Choose how you prefer to pay for this job.'}
        required
      >
        <div className="flex gap-4">
          <Controller
            control={control}
            name="salary"
            defaultValue={0}
            render={({ field }) => (
              <NumericFormat
                required
                thousandSeparator=","
                onValueChange={(val: NumberFormatValues) => {
                  field.onChange(val.value);
                }}
                customInput={(props) => {
                  return (
                    <Input
                      prefix="£"
                      className="flex-1"
                      label={'Amount you want to pay'}
                      {...props}
                    />
                  );
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="salaryFrequency"
            render={({ field }) => (
              <Select
                className="flex-1"
                label="How often"
                placeholder="e.g. Choose an option"
                value={field.value}
                onChange={(val) => setValue('salaryFrequency', val)}
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
        </div>
      </FormControlGroup>

      <div className="flex gap-10 px-10 py-6">
        <div>
          <strong className="leading-6">Company benefits *</strong>
          <div className="leading-6">
            If you want to customise your company benefits please go to your
            company page. This is included at the bottom of all your job pages.
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button variant="secondary">
            <Icon icon="edit" className="mr-1 h-5 w-5" />
            Go to Company details
          </Button>
        </div>
      </div>
    </form>
  );
}

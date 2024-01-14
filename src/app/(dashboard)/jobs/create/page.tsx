'use client';

import { Button, IconButton } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input, Textarea, Select } from '@/components/elements/input';
import { FormControlGroup, FormSection } from '@/components/modules/job-form';
import { NumericFormat } from 'react-number-format';

export default function JobCreatePage() {
  return (
    <div className="container max-w-6xl">
      <div className="mb-6 flex items-center">
        <div className="text-3xl font-medium">Create a job</div>

        <div className="ml-auto flex gap-4">
          <Button variant="secondary">Job Templates</Button>
          <Button variant="secondary">AI Job Generator</Button>
          <IconButton variant="secondary" icon="close" />
        </div>
      </div>

      <div className="card-container">
        <FormSection>
          <div className="text-2xl font-medium">Tell us about your job</div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary">Preview</Button>
            <Button variant="secondary">
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
          <Input placeholder="e.g. Senior product Designer" />
        </FormControlGroup>

        <FormControlGroup
          title="Job description"
          description={
            'Provide a description about your company, \
            what you’re looking for and a short description about the job.'
          }
          required
        >
          <Textarea
            rows={10}
            placeholder={
              'e.g. We’re looking for a full-time senior product designer' +
              'with 6-8 years experience in product design and leadership.' +
              'This position is located in New York City.'
            }
          />
        </FormControlGroup>

        <FormControlGroup
          title="Job location"
          description={
            'Where will they work. If left blank location will be set to “Remote”'
          }
          required
        >
          <Input rows={10} placeholder={'e.g. “London” or “Liverpool”'} />
        </FormControlGroup>

        <FormControlGroup
          title="Employment type"
          description={'Why type of employment is this job?'}
          required
        >
          <Select
            value={''}
            options={[
              { label: 'Full-Time Employment', value: 'full-time-employment' },
              { label: 'Part-Time Employment', value: 'part-time-employment' },
              { label: 'Freelance', value: 'freelance' },
              { label: 'Contractual', value: 'contractual' },
              { label: 'Temporary Employment', value: 'temporary-employment' },
              { label: 'Internship', value: 'internship' },
              { label: 'Volunteer Work', value: 'volunteer-work' },
              { label: 'Seasonal Work', value: 'seasonal-work' },
            ]}
            onChange={(val) => console.log(val)}
            placeholder='e.g. "Full-time" and "Part-time"'
          />
        </FormControlGroup>

        <FormControlGroup
          title="Salary"
          description={'Choose how you prefer to pay for this job.'}
          required
        >
          <div className="flex gap-4">
            <NumericFormat
              thousandSeparator=","
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

            <Select
              value={''}
              label="How often"
              options={[
                {
                  label: 'Yearly',
                  value: 'yearly',
                },
                {
                  label: 'Monthly',
                  value: 'monthly',
                },
                { label: 'Weekly', value: 'weekly' },
              ]}
              onChange={(val) => console.log(val)}
              placeholder="e.g. Choose an option"
              className="flex-1"
            />
          </div>
        </FormControlGroup>

        <div className="flex gap-10 px-10 py-6">
          <div>
            <strong className="leading-6">Company benefits *</strong>
            <div className="leading-6">
              If you want to customise your company benefits please go to your
              company page. This is included at the bottom of all your job
              pages.
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button variant="secondary">
              <Icon icon="edit" className="mr-1 h-5 w-5" />
              Go to Company details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

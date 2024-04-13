import { z } from 'zod';

export const employmentTypeSchema = z.enum([
  'full-time-employment',
  'part-time-employment',
  'freelance',
  'contractual',
  'temporary-employment',
  'internship',
  'volunteer-work',
  'seasonal-work',
]);

export const screeningQuestion = z.object({
  title: z.string(),
  type: z.enum(['video', 'text']),
});

export type ScreeningQuestion = z.infer<typeof screeningQuestion>;

export const salaryFrequencySchema = z.enum(['weekly', 'monthly', 'yearly']);

export const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.any(), // Use the defined schema for the description
  location: z.string(),
  department: z.string().optional(),
  code: z.string().optional(),
  employmentType: employmentTypeSchema,
  screeningQuestions: z.array(screeningQuestion),
  salary: z
    .object({
      min: z.any(),
      max: z.any(),
      currency: z.string(),
      frequency: salaryFrequencySchema,
    })
    .strict(),
});

export type JobSchema = z.infer<typeof jobSchema>;

export type EmploymentType = z.infer<typeof employmentTypeSchema>;

export type JobState = 'draft' | 'published' | 'filled';

export interface JobPosting extends JobSchema {
  id?: string;
  slug?: string;
  publishedAt?: Date;
}

export enum JobPostingState {
  Draft = 'draft',
  Filled = 'filled',
  Published = 'published',
}

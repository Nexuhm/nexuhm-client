import { z } from 'zod';

const careersPageForm = z.object({
  title: z.string(),
  heroImages: z.array(z.string()),
  mediaGallery: z.array(z.string()),
  workplaceCulture: z.string(),
  companyMission: z.string(),
  companyBenefits: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  companyValues: z.array(
    z.object({
      value: z.string(),
    }),
  ),
});

export type CareersPageProps = z.infer<typeof careersPageForm>;

export const CompanyFormSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/g,
      'Slug must only contain lowercase letters, numbers, and hyphens',
    ),
  companySize: z.string(),
  industry: z.string(),
  website: z.string().url(),
});

export type CompanyFormValues = z.infer<typeof CompanyFormSchema>;

export const AddressFormSchema = z.object({
  address: z.string(),
});

export type AddressFormValues = z.infer<typeof AddressFormSchema>;

export const AboutFormSchema = z.object({
  description: z.string(),
});

export type AboutFormValues = z.infer<typeof AboutFormSchema>;

export const CultureFormSchema = z.object({
  cultureDescription: z.string(),
});

export type CultureFormValues = z.infer<typeof CultureFormSchema>;

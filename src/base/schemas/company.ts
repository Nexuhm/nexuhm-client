import { z } from 'zod';

export const CompanyFormSchema = z.object({
  name: z.string(),
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

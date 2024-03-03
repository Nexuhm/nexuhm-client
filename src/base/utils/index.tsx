import { EmploymentType } from "../types/jobs";

export function formatEmploymentTypeLabel(type: EmploymentType): string {
  const labelMap = {
    'full-time-employment': 'Full Time',
    'part-time-employment': 'Part Time',
    freelance: 'Freelance',
    contractual: 'Contractual',
    'temporary-employment': 'Temporary',
    internship: 'Internship',
    'volunteer-work': 'Volunteer',
    'seasonal-work': 'Seasonal',
  };

  return labelMap[type];
}

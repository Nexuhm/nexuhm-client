import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en-GB';

import { format, parse, addMinutes } from 'date-fns';
import { EmploymentType, SalaryFrequency } from '../types/jobs';

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

/**
 * Adds a specified number of minutes to a time string.
 *
 * @param {string} timeString The time string in 'HH:mm' format.
 * @param {number} minutesToAdd The number of minutes to add.
 * @return {string} The new time string after adding the minutes.
 */
export function addMinutesToTimeString(
  timeString: string,
  minutesToAdd: number,
) {
  // Parse the time string to a Date object, assuming today's date
  const time = parse(timeString, 'HH:mm', new Date());

  // Add the specified number of minutes
  const newTime = addMinutes(time, minutesToAdd);

  // Format and return the new time
  return format(newTime, 'HH:mm');
}

export function formatCurrency(
  min: number,
  max: number,
  frequency: SalaryFrequency = 'yearly',
  currency = 'GBP',
) {
  const formatter = new Intl.NumberFormat('en-GB', {
    currency,
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
    minimumFractionDigits: 0,
  });

  const minFormatted = min ? formatter.format(min) : 'N/A';
  const maxFormatted = max ? formatter.format(max) : 'N/A';

  const getFrequencyLabel = (frequency: SalaryFrequency) => {
    const labelMap = {
      yearly: 'per year',
      monthly: 'per month',
      weekly: 'per week',
      hourly: 'per hour',
    } as const;

    return labelMap[frequency];
  };

  return `${minFormatted} - ${maxFormatted} ${getFrequencyLabel(frequency)}`;
}

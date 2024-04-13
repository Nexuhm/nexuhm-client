import React from 'react';

import HomeIcon from '@/assets/icons/home.svg';
import GroupIcon from '@/assets/icons/group.svg';
import AnalyticsIcon from '@/assets/icons/analytics.svg';
import SearchIcon from '@/assets/icons/search.svg';
import CaretDownIcon from '@/assets/icons/caret-down.svg';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import EditIcon from '@/assets/icons/edit.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CloseIcon from '@/assets/icons/close.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CircledCheckIcon from '@/assets/icons/circled-check.svg';
import CircledQuestionIcon from '@/assets/icons/circled-question.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import CaseIcon from '@/assets/icons/case.svg';
import LocationIcon from '@/assets/icons/location.svg';
import VerticalDotsIcon from '@/assets/icons/vertical-dots.svg';
import EnvelopeIcon from '@/assets/icons/envelope.svg';
import CaseFilledIcon from '@/assets/icons/case-filled.svg';
import CashIcon from '@/assets/icons/cash.svg';
import TrashIcon from '@/assets/icons/trash.svg';

export type IconName =
  | 'home'
  | 'group'
  | 'analytics'
  | 'search'
  | 'caret-down'
  | 'filter'
  | 'plus'
  | 'close'
  | 'edit'
  | 'check'
  | 'chevron-down'
  | 'circled-check'
  | 'circled-question'
  | 'arrow-left'
  | 'case'
  | 'clock'
  | 'calendar'
  | 'location'
  | 'vertical-dots'
  | 'envelope'
  | 'case-filled'
  | 'cash'
  | 'trash';

// Define the IconProps interface
interface IconProps {
  icon: IconName;
  className?: string;
}

// Mapping IconName to the imported SVG components
const icons: Record<
  IconName,
  React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
> = {
  home: HomeIcon,
  group: GroupIcon,
  analytics: AnalyticsIcon,
  search: SearchIcon,
  plus: PlusIcon,
  filter: FilterIcon,
  check: CheckIcon,
  close: CloseIcon,
  edit: EditIcon,
  clock: ClockIcon,
  case: CaseIcon,
  calendar: CalendarIcon,
  location: LocationIcon,
  envelope: EnvelopeIcon,
  'caret-down': CaretDownIcon,
  'chevron-down': ChevronDownIcon,
  'circled-check': CircledCheckIcon,
  'circled-question': CircledQuestionIcon,
  'arrow-left': ArrowLeftIcon,
  'vertical-dots': VerticalDotsIcon,
  'case-filled': CaseFilledIcon,
  cash: CashIcon,
  trash: TrashIcon,
};

// Icon component using function declaration
export function Icon({ icon, className }: IconProps) {
  const IconComponent = icons[icon];

  // Check if the IconComponent is valid
  if (!IconComponent) {
    console.warn(`Icon component not found for name: ${icon}`);

    return null;
  }

  return <IconComponent className={className} />;
}

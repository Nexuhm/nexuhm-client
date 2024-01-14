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
import CloseIcon from '@/assets/icons/close.svg';
import CheckIcon from '@/assets/icons/check.svg';

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
  | 'chevron-down';

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
  'caret-down': CaretDownIcon,
  'chevron-down': ChevronDownIcon,
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

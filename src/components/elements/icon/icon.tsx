import React from 'react';

import HomeIcon from '@/assets/icons/home.svg';
import GroupIcon from '@/assets/icons/group.svg';
import AnalyticsIcon from '@/assets/icons/analytics.svg';
import SearchIcon from '@/assets/icons/search.svg';
import CaretDown from '@/assets/icons/caret-down.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import PlusIcon from '@/assets/icons/plus.svg';

export type IconName =
  | 'home'
  | 'group'
  | 'analytics'
  | 'search'
  | 'caret-down'
  | 'filter'
  | 'plus';

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
  'caret-down': CaretDown,
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

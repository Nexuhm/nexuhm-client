import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export function Rating({ rate }: { rate: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={clsx(
            index < rate ? 'text-blue' : 'text-light-gray',
            'w-4',
          )}
        />
      ))}
    </div>
  );
}

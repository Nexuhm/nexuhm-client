import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export function Rating({ rate }: { rate: number }) {
  const scaleScore = (originalMin = 0, originalMax = 10) => {
    // Clamp original score to the provided range
    const adjustedScore = Math.max(originalMin, Math.min(rate, originalMax));

    // Calculate the new scaled score based on the ratio between the original range and the desired 0-5 range
    const scaledRate =
      (adjustedScore - originalMin) * (5 / (originalMax - originalMin));

    return Math.round(scaledRate);
  };

  const scaledScore = scaleScore();

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={clsx(
            index < scaledScore ? 'text-blue' : 'text-light-gray',
            'w-4',
          )}
        />
      ))}
    </div>
  );
}

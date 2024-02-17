import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export function Avatar({ image }: { image?: string }) {
  return (
    <div
      className={clsx(
        'relative h-10 w-10',
        'overflow-hidden rounded-full bg-light-gray',
        'flex items-center justify-center',
      )}
    >
      {image ? (
        <Image src={image} fill alt="" />
      ) : (
        <div>
          <FontAwesomeIcon className="text-content-placehdoler" icon={faUser} />
        </div>
      )}
    </div>
  );
}

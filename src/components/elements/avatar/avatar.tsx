import Image from 'next/image';
import BoringAvatar from 'boring-avatars';
import clsx from 'clsx';

export function Avatar({ name, image }: { name?: string; image?: string }) {
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
        <BoringAvatar
          name={name}
          variant='marble'
          colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
      )}
    </div>
  );
}

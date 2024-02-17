'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useUserData } from '@/base/hooks/use-user-data';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { ProfileImageDialog } from './profile-upload-dialog';
import { Spinner } from '@/components/elements/spinner';
import { client } from '@/base/services/browser-client';

export function ProfileImageForm() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, mutate } = useUserData();
  const [picture, setPicture] = useState<string>();

  useEffect(() => {
    setPicture(data?.picture);
  }, [data]);

  const handleImageDelete = async () => {
    await client.post('/account/update', {
      picture: null,
    });

    mutate();
  };

  return (
    <div className="p-6 card-container">
      <div className="mb-2">
        <div className="font-inter text-xl font-medium">Profile Picture</div>
        <div className="text-sm text-content-secondary">
          Help team members quickly know who you are
        </div>
      </div>

      {!isLoading && (
        <div className="flex flex-col gap-4">
          <div className="relative h-24 w-24">
            <button
              onClick={() => setOpen(true)}
              className="relative h-24 w-24 select-none overflow-hidden rounded-full border"
            >
              {picture ? (
                <Image src={picture} fill alt="" />
              ) : (
                <div className="flex h-full w-full items-center bg-surface-secondary p-3 text-center text-xs">
                  Click to upload an avatar
                </div>
              )}

              {isLoading && (
                <div>
                  <Spinner size={40} />
                </div>
              )}
            </button>

            <button
              onClick={() => handleImageDelete()}
              className={clsx(
                'absolute  bottom-0 right-0',
                'inline-flex h-7 w-7 items-center justify-center',
                'rounded-full border bg-white p-1 ',
              )}
            >
              <FontAwesomeIcon icon={faTrashCan} className="h-3 w-3" />
            </button>
          </div>

          <ProfileImageDialog
            open={open}
            onClose={() => setOpen(false)}
            onImageChange={() => {
              setOpen(false);
              mutate();
            }}
          />
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover } from '@headlessui/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Avatar } from '@/components/elements/avatar';
import { useUserData } from '@/base/hooks/use-user-data';
import styles from './profile-dropdown.module.scss';
import { Dropdown } from '@/components/elements/dropdown';

export function ProfileDropdown() {
  const { data } = useUserData();

  return (
    <Dropdown enableArrow>
      <Dropdown.Button className="flex items-center gap-2 outline-none">
        <div
          className={clsx(
            'relative h-10 w-10',
            'overflow-hidden rounded-full bg-light-gray',
            'flex items-center justify-center',
          )}
        >
          <Avatar
            name={`${data?.firstname} ${data?.lastname}`}
            image={data?.picture}
          />
        </div>

        <FontAwesomeIcon
          icon={faCaretDown}
          className="h-3 w-3 text-content-primary"
        />
      </Dropdown.Button>

      <Dropdown.Content>
        <div className="relative z-10 flex flex-col gap-1">
          <a href="/settings/account" className={styles.link}>
            Profile
          </a>
          <a href="/admin/jobs" className={styles.link}>
            Dashboard
          </a>
          <a href="/settings/careers-page" className={styles.link}>
            Company
          </a>
          <div className="my-1 border-b"></div>
          <a href="/api/auth/logout" className={styles.link}>
            Log Out
          </a>
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}

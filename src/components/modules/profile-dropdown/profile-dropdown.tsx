import { useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover } from '@headlessui/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Avatar } from '@/components/elements/avatar';
import { useUserData } from '@/base/hooks/use-user-data';
import styles from './profile-dropdown.module.scss';

export function ProfileDropdown() {
  const { data } = useUserData();
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowElement,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 12],
          },
        },
      ],
    },
  );

  return (
    <div>
      <Popover>
        <Popover.Button
          ref={setReferenceElement}
          className="flex items-center gap-2 outline-none"
        >
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
        </Popover.Button>

        <Popover.Panel
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
          className={styles.tooltip}
        >
          <div className="relative z-10 flex flex-col gap-1">
            <a href="/settings/account" className={styles.link}>
              Profile
            </a>
            <a href="/settings/careers-page" className={styles.link}>
              Company
            </a>
            <div className="my-1 border-b"></div>
            <a href="/api/auth/logout" className={styles.link}>
              Log Out
            </a>
          </div>
          <div
            ref={setArrowElement}
            style={popperStyles.arrow}
            className={styles.arrow}
          />
        </Popover.Panel>
      </Popover>
    </div>
  );
}

import React, { forwardRef, useId, useState } from 'react';
import { Icon, IconName } from '../icon';
import { Listbox } from '@headlessui/react';
import styles from './input.module.scss';
import clsx from 'clsx';

type ValueType = string | number;

interface SelectOptionProps {
  label: string;
  value: ValueType;
}

interface SelectProps {
  id?: string;
  className?: string;
  label?: string;
  icon?: IconName;
  value: ValueType;
  options: SelectOptionProps[];
  placeholder?: string;
  onChange: (val: ValueType) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    { id, className, label, placeholder, icon, value, options, onChange },
    ref,
  ) => {
    return (
      <Listbox
        as="div"
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        className={clsx('text-sm', className)}
      >
        {({ open }) => (
          <>
            {label && (
              <label htmlFor="email" className="mb-1 inline-block">
                {label}
              </label>
            )}

            <div className="relative">
              <Listbox.Button
                className={clsx(
                  styles.inputContainer,
                  'relative w-full outline-none',
                )}
              >
                {icon && (
                  <span className="mr-1">
                    <Icon icon={icon} className="w-6 text-content-secondary" />
                  </span>
                )}
                {value ? (
                  <span>{value}</span>
                ) : (
                  <span className="select-none text-content-placehdoler">
                    {placeholder}
                  </span>
                )}

                <Icon
                  icon="chevron-down"
                  className={clsx(
                    'ml-auto w-6 text-content-secondary transition-all',
                    open && 'rotate-180',
                  )}
                />
              </Listbox.Button>

              <Listbox.Options
                className={clsx(
                  'absolute left-0 top-11 z-10 w-full overflow-hidden',
                  'border border-light-gray card-container',
                )}
              >
                {options.map(({ label, value }) => (
                  <Listbox.Option
                    key={value}
                    value={value}
                    className="cursor-pointer p-1.5 px-3 hover:bg-black hover:bg-opacity-10"
                  >
                    {label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    );
  },
);

'use client';

import React from 'react';
import { Icon, IconName } from '../icon';
import { Listbox } from '@headlessui/react';
import styles from './input.module.scss';
import clsx from 'clsx';

type ValueType = string | number;

interface SelectOptionProps<T = ValueType> {
  label: string;
  value: T;
}

interface SelectProps<T> {
  id?: string;
  className?: string;
  label?: string;
  icon?: IconName;
  error?: string;
  value: T;
  options: SelectOptionProps<T>[];
  placeholder?: string;
  required?: boolean;
  onChange: (val: T) => void;
}

export function Select<T>({
  id,
  className,
  label,
  placeholder,
  icon,
  value,
  error,
  options,
  required,
  onChange,
}: SelectProps<T>) {
  const selected = options.find((i) => i.value === value);

  return (
    <Listbox
      as="div"
      id={id}
      value={value}
      onChange={(val) => onChange(val as T)}
      className={clsx('text-sm', className)}
    >
      {({ open }) => (
        <>
          {label && (
            <label
              htmlFor="email"
              className="input-label"
              data-required={required}
            >
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
              {selected ? (
                <span>{selected.label}</span>
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
                'absolute left-0 top-11 z-10 max-h-[290px] w-full overflow-auto',
                'rounded-md border border-light-gray bg-white',
              )}
            >
              {options.map(({ label, value }) => (
                <Listbox.Option
                  key={value as string}
                  value={value}
                  className="cursor-pointer p-1.5 px-3 hover:bg-black hover:bg-opacity-10 ui-active:bg-black ui-active:bg-opacity-10"
                >
                  {label}
                </Listbox.Option>
              ))}
            </Listbox.Options>

            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
        </>
      )}
    </Listbox>
  );
}

import React, { useState } from 'react';
import { Icon, IconName } from '../icon';
import { Combobox } from '@headlessui/react';
import styles from './input.module.scss';
import clsx from 'clsx';
import { useClickAway } from 'react-use';

type ValueType = string | number;

interface ComboboxOptionProps<T = ValueType> {
  label: string;
  value: T;
}

interface ComboboxProps<T> {
  id?: string;
  className?: string;
  label?: string;
  icon?: IconName;
  value: T;
  options: ComboboxOptionProps<T>[];
  placeholder?: string;
  required?: boolean;
  onChange: (val: T) => void;
}

export function ComboboxSelect<T>({
  id,
  className,
  label,
  placeholder,
  icon,
  value,
  options,
  required,
  onChange,
}: ComboboxProps<T>) {
  const [ref, setRef] = useState<any>();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const filteredOptions =
    query === ''
      ? options
      : options.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });

  useClickAway({ current: ref }, () => {
    setOpen(false);
  });

  const selected = options.find((i) => i.value === value);

  return (
    <Combobox
      as="div"
      id={id}
      value={selected}
      onChange={(val) => {
        onChange(val as T);
        setOpen(false);
      }}
      className={clsx('text-sm', className)}
      ref={setRef}
    >
      {() => (
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
            <div
              className={clsx(
                styles.inputContainer,
                'relative w-full outline-none',
              )}
              onClick={() => setOpen(true)}
            >
              <Combobox.Input
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(val: ComboboxOptionProps) => val.label}
              />

              {icon && (
                <span className="mr-1">
                  <Icon icon={icon} className="w-6 text-content-secondary" />
                </span>
              )}

              <Icon
                icon="chevron-down"
                className={clsx(
                  'ml-auto w-6 text-content-secondary transition-all',
                  open && 'rotate-180',
                )}
              />
            </div>

            {open && (
              <Combobox.Options
                static
                className={clsx(
                  'absolute left-0 top-11 z-10 max-h-[290px] w-full overflow-auto',
                  'rounded-md border border-light-gray bg-white',
                )}
              >
                {filteredOptions.map(({ label, value }) => (
                  <Combobox.Option
                    key={value as string}
                    value={value}
                    className="cursor-pointer p-1.5 px-3 hover:bg-black hover:bg-opacity-10 ui-active:bg-black ui-active:bg-opacity-10"
                  >
                    {label}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </>
      )}
    </Combobox>
  );
}

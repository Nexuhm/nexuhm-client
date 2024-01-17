import { ReactNode } from 'react';
import { Button } from '../../../button';
import { Listbox } from '@headlessui/react';

export interface ToolbarListOption<T> {
  label: ReactNode;
  value: T;
}

interface ToolbarCommandListProps<T> {
  title: string;
  onChange: (val: T) => void;
  options: ToolbarListOption<T>[];
}

export function ToolbarCommandList<T>({
  title,
  onChange,
  options,
}: ToolbarCommandListProps<T>) {
  return (
    <Listbox as="div" className="relative" onChange={onChange}>
      <Listbox.Button as={Button} size="xs">
        {title}
      </Listbox.Button>

      <Listbox.Options className="absolute z-10 top-7 overflow-hidden rounded-md border border-light-gray bg-white">
        {options.map(({ value, label }) => (
          <Listbox.Option
            value={value}
            className="cursor-pointer w-20 bg-white px-2 py-1 text-xs hover:bg-black hover:bg-opacity-10"
          >
            {label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

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

      <Listbox.Options className="absolute top-7 z-10 overflow-hidden rounded-md border border-light-gray bg-white">
        {options.map(({ value, label }, index) => (
          <Listbox.Option
            key={index}
            value={value}
            className="w-20 cursor-pointer bg-white px-2 py-1 text-xs hover:bg-black hover:bg-opacity-10"
          >
            {label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

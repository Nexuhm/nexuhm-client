import { ReactNode, useEffect, useId, useState } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import clsx from 'clsx';
import { Icon } from '../icon';
import { Tooltip } from '../tooltip';

interface SwitchProps {
  label?: ReactNode;
  tooltip?: ReactNode;
  checked?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Switch({
  label,
  checked = false,
  required,
  tooltip,
  onChange,
}: SwitchProps) {
  const id = useId();
  const [_checked, setChecked] = useState(checked);

  useEffect(() => {
    onChange?.(_checked);
  }, [_checked]);

  return (
    <div className="flex justify-between">
      {label && (
        <div className="flex gap-2 font-medium text-content-secondary">
          {required && <div className="text-red">*</div>}
          {label}

          <Tooltip content={tooltip}>
            <button type="button">
              <Icon
                icon="circled-question"
                className="w-5 text-content-tertiary"
              />
            </button>
          </Tooltip>
        </div>
      )}

      <HeadlessSwitch
        checked={_checked}
        onChange={(val) => setChecked(val)}
        className={clsx(
          _checked ? 'bg-blue' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 items-center rounded-full',
          'transition-colors duration-200 ease-in-out',
        )}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={clsx(
            _checked ? 'translate-x-6' : 'translate-x-1',
            'inline-block h-4 w-4 transform rounded-full bg-white transition duration-200',
          )}
        />
      </HeadlessSwitch>
    </div>
  );
}

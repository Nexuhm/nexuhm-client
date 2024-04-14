import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import styles from './checkbox.module.scss';
import { Icon } from '@/components/elements/icon';

interface CheckboxProps {
  id?: string;
  name?: string;
  label?: ReactNode;
  error?: boolean | string;
  checked?: boolean;
  required?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({
  id,
  label,
  checked,
  name,
  error,
  required,
  onChange,
}: CheckboxProps) {
  const internalId = useId();
  const [ref, setRef] = useState<HTMLInputElement | null>();

  useEffect(() => {
    if (ref && checked != null) {
      ref.checked = checked;
    }
  }, [checked, ref]);

  const inputId = id || internalId;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    const isEnterPressed = event.key === 'Enter' || event.key === ' ';

    if (onChange && isEnterPressed) {
      onChange(!checked);
    }
  };

  return (
    <label
      role="checkbox"
      className={styles.checkbox}
      data-error={!!error}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={setRef}
        id={inputId}
        name={name}
        type="checkbox"
        className='w-0 h-0'
        onChange={() => onChange && onChange(!checked)}
        checked={checked}
        required
      />

      <div className={styles.indicator}>
        <Icon icon="check" className={styles.icon} />
      </div>

      {label && (
        <div className='flex gap-2'>
          {required && <div className="text-red">*</div>}

          {label}
        </div>
      )}
    </label>
  );
}

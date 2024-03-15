import styles from './tabs.module.scss';

interface TabsProps<T> {
  tabs: Array<{
    id: T;
    label: string;
  }>;
  selected: T;
  onChange: (id: T) => void;
}

export function Tabs<T>({ selected, tabs, onChange }: TabsProps<T>) {
  return (
    <div className="border-b border-light-gray">
      {tabs.map(({ id, label }) => (
        <button
          key={id as string}
          className={styles.tab}
          data-selected={selected === id}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

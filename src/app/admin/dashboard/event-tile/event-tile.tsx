import { Button } from '@/components/elements/button';
import styles from './event-tile.module.scss';

type EventStatus = 'confirmed' | 'canceled' | 'unconfirmed';

interface EventTileProps {
  name: string;
  subject: string;
  time: string;
  status: 'confirmed' | 'canceled' | 'unconfirmed';
  cta?: {
    title: string;
    text: string;
    href: string;
  };
}

export function EventTile({
  name,
  subject,
  time,
  cta,
  status,
}: EventTileProps) {
  return (
    <div className={styles.eventTile} data-status={status}>
      <div className={styles.details}>
        <div className="pr-4">{time}</div>
        <div className={styles.subject}>
          <div className="mb-1 text-base font-semibold leading-none">
            {name}
          </div>
          <div className="text-sm font-medium leading-none">{subject}</div>
        </div>

        <div className={styles.status}>{status}</div>
      </div>

      {cta && (
        <div className={styles.cta}>
          <div className={styles.ctaTitle}>{cta.title}</div>
          <Button className="w-full !rounded-full" href={cta.href}>
            {cta.text}
          </Button>
        </div>
      )}
    </div>
  );
}

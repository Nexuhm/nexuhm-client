import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './calendar.module.scss';
import useSWR from 'swr';
import { client } from '@/base/services/clients/browser-client';
import { format, parseISO } from 'date-fns';

/**
 * Extracts the date part from a date-time string.
 * @param {string} dateTimeString - The date-time string from which to extract the date.
 * @returns {string} The date part in "YYYY-MM-DD" format.
 */
function extractDate(dateTimeString: string) {
  try {
    const dateObject = parseISO(dateTimeString);
    const dateString = format(dateObject, 'yyyy-MM-dd');
    return dateString;
  } catch (error) {
    console.error('Error extracting date:', error);
    return null; // or handle the error based on your needs
  }
}

export function DashboardCalendar() {
  const { data = [] } = useSWR('/events', (url) => client.get(url));

  return (
    <div className={styles.calendarWrapper}>
      <FullCalendar
        dayHeaderClassNames="font-medium"
        eventClassNames={styles.event}
        viewClassNames={styles.calendar}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={data.map((event: any) => ({
          ...event,
          date: extractDate(event.date),
        }))}
        headerToolbar={{
          end: 'today prev,next',
        }}
      />
    </div>
  );
}

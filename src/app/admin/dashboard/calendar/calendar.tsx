import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './calendar.module.scss';

export function DashboardCalendar() {
  return (
    <div className={styles.calendarWrapper}>
      <FullCalendar
        dayHeaderClassNames="font-medium"
        eventClassNames="bg-green px-2 font-medium"
        viewClassNames={styles.calendar}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'David | Designer Interview', date: '2024-03-01' },
          {
            title: 'Michael | Senior Developer',
            date: '2024-03-04',
            className: 'bg-rose border-rose',
          },
        ]}
        headerToolbar={{
          end: 'today prev,next',
        }}
      />
    </div>
  );
}

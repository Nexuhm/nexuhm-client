import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styles from './calendar.module.scss';

export function DashboardCalendar() {
  return (
    <div className={styles.calendarWrapper}>
      <FullCalendar
        dayHeaderClassNames="font-medium"
        eventClassNames={styles.event}
        viewClassNames={styles.calendar}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          {
            title: 'David | Designer Interview',
            date: '2024-03-01',
            className: 'bg-green border-green',
          },
          {
            title: 'Rose | HR Partner',
            date: '2024-03-04 07:40',
            className: 'bg-amber border-amber',
          },
          {
            title: 'Michael | Senior Developer',
            date: '2024-03-04 08:00',
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

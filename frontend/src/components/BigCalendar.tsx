import { useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { Event } from '../types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalendarView = 'month' | 'week' | 'day' | 'agenda';

interface BigCalendarProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

const BigCalendar = ({ events, onSelectEvent }: BigCalendarProps) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');

  const calendarEvents = useMemo(() => {
    return events.map((event) => ({
      title: event.email,
      start: new Date(event.date),
      end: new Date(event.date),
      resource: event,
    }));
  }, [events]);

  const handleSelectEvent = (event: { resource: Event }) => {
    onSelectEvent(event.resource);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleSelectEvent}
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        views={['month', 'week', 'day', 'agenda']}
      />
    </div>
  );
};

export default BigCalendar;

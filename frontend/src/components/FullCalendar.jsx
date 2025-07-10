// src/components/MyCalendar.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/calendar.css'; 


const MyCalendar = () => {
  const handleDateClick = (info) => {
    alert(`Ai dat click pe: ${info.dateStr}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      editable={true}
      selectable={true}
      events={[
        { title: 'Eveniment test', date: '2025-07-15' },
        { title: 'Întâlnire', date: '2025-07-18' },
        {
          title: 'Important',
          date: '2025-07-15',
          className: 'important-event',
        },
      ]}
    />
  );
};

export default MyCalendar;

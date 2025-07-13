// src/components/MyCalendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/calendar.css';
import { isMultiDayRange } from '@fullcalendar/core/internal';

const MyCalendar = () => {
  const [eventList, setEventList] = useState([
    { title: 'Eveniment test', date: '2025-07-15', id: 1 },
    { title: 'Întâlnire', date: '2025-07-18', id: 2 },
    {
      title: 'Important',
      date: '2025-07-15',
      className: 'important-event',
      id: 3,
    },
    {
      title: 'Important',
      date: '2025-07-15',
      className: 'important-event',
      id: 4,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate);

    const eventsForDay = eventList.filter((ev) => ev.date === clickedDate);
    console.log('Events:', eventsForDay);
    setFilteredEvents(eventsForDay);
    setShowModal(true);
  };

  const addEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: newEventTitle,
      date: selectedDate,
    };
    setEventList([...eventList, newEvent]);
    setNewEventTitle('');
    setShowModal(false);
  };

  const deleteEvent = (id) => {
    const updatedList = eventList.filter((ev) => ev.id !== id);
    setEventList(updatedList);

    // Dacă ștergi în timp ce modalul e deschis, actualizează și filteredEvents
    const updatedFiltered = filteredEvents.filter((ev) => ev.id !== id);
    setFilteredEvents(updatedFiltered);
  };

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        dayMaxEvents={1}
        editable={true}
        selectable={true}
        height="auto"
        contentHeight="auto"
        expandRows={true}
        locale="ro"
        weekends={true}
        events={eventList}
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Evenimente pentru {selectedDate}</h2>
            <div className="modal-event-list">
              <ul>
                {filteredEvents.map((ev) => (
                  <li key={ev.id}>
                    {ev.title}
                    <button onClick={() => deleteEvent(ev.id)}>🗑️</button>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <button onClick={addEvent}>Adaugă</button>
            <button onClick={() => setShowModal(false)}>Închide</button>
          </div>
        </div>
          )}
          
    </div>
  );
};

export default MyCalendar;

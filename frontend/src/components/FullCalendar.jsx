// src/components/MyCalendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import '../styles/calendar.css';

const MyCalendar = () => {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');

  const token = localStorage.getItem('token');
  const apiBase = 'https://calendar-planner-api-nwpq.onrender.com/api/events';

  useEffect(() => {
    if (!token) return;
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        localStorage.getItem('token');
        const res = await axios.get(apiBase, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Evenimente primite din backend:', res.data);
        setEventList(res.data);
      } catch (err) {
        console.error('Eroare la încărcarea evenimentelor:', err);
        setErrorMessage('Eroare la încărcarea evenimentelor.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate);

    const eventsForDay = eventList.filter((ev) => ev.date === clickedDate);
    setFilteredEvents(eventsForDay);
    setShowModal(true);
  };

  const addEvent = async () => {
    try {
      const newEvent = {
        title: newEventTitle,
        date: selectedDate,
      };
      localStorage.getItem('token');
      const res = await axios.post(apiBase, newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEventList((prev) => [...prev, res.data.event]);
      setFilteredEvents((prev) => [...prev, res.data.event]);
      setNewEventTitle('');
      setShowModal(false);
    } catch (err) {
      console.error('Eroare la adăugare:', err);
      alert('Nu s-a putut adăuga evenimentul.');
    }
  };

  const deleteEvent = async (id) => {
    try {
      localStorage.getItem('token');
      await axios.delete(`${apiBase}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedList = eventList.filter((ev) => ev.id !== id);
      setEventList(updatedList);

      const updatedFiltered = filteredEvents.filter((ev) => ev.id !== id);
      setFilteredEvents(updatedFiltered);
    } catch (err) {
      console.error('Eroare la ștergere:', err);
      alert('Nu s-a putut șterge evenimentul.');
    }
  };

  return (
    <div className="calendar-wrapper">
      {isLoading && <p>Se încarcă evenimentele...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
              placeholder="Titlu eveniment"
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

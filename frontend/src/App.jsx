import { setRef } from '@fullcalendar/core/internal';
import React, { useState } from 'react';
import MyCalendar from './components/FullCalendar';

const App = () => {
  return (
    <div>
      <h1>Planner-ul Meu</h1>
      <MyCalendar />
    </div>
  );
}
 
export default App;
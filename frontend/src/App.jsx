import { setRef } from '@fullcalendar/core/internal';
import React, { useState } from 'react';
import MyCalendar from './components/FullCalendar';
import './index.css'


const App = () => {
  return (
    <div className='dashboard'>
      <h1>Plan you days</h1>
      <MyCalendar />
    </div>
  );
}
 
export default App;
import React from 'react';
import MyCalendar from './components/FullCalendar';
import './styles/dashboard.css'


const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <h1>Plan your days</h1>
      <button onClick={onLogout} className='logout-btn'>Logout</button>
      <MyCalendar />
    </div>
  );
};

export default Dashboard;

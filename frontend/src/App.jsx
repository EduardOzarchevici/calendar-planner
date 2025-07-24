import { setRef } from '@fullcalendar/core/internal';
import MyCalendar from './components/FullCalendar';
import './index.css'
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState('login'); // "login" sau "register"

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        mode === 'login' ? (
          <>
            <Login onLogin={handleAuthSuccess} />
            <p className='auth-p'>
              Nu ai cont?{' '}
              <button onClick={() => setMode('register')}>
                Înregistrează-te
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onRegister={handleAuthSuccess} />
            <p className='auth-p'>
              Ai deja cont?{' '}
              <button onClick={() => setMode('login')}>Autentifică-te</button>
            </p>
          </>
        )
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

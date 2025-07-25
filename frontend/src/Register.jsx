import React, { useState } from 'react';
import axios from 'axios';
import './styles/auth-form.css';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Înregistrare
      const res = await axios.post(
        'https://calendar-planner-api-nwpq.onrender.com/api/register',
        {
          username,
          password,
        }
      );
      // // Autentificare automată după înregistrare
      // const res = await axios.post(
      //   'https://calendar-planner-api-nwpq.onrender.com/login',
      //   {
      //     username,
      //     password,
      //   }
      // );
      
      localStorage.setItem('token', res.data.token);
      onRegister();
    } catch (err) {
      setError('Înregistrarea a eșuat.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Înregistrare</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Înregistrează-te</button>
    </form>
  );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import './styles/auth-form.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://calendar-planner-api-nwpq.onrender.com/api/login',
        {
          username,
          password,
        }
      );
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      setError('Username sau parolă incorecte.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>Login</h2>
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
      <button type="submit">Autentificare</button>
    </form>
  );
};

export default Login;

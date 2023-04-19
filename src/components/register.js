import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    // Handle user registration logic here
    console.log('Registered:', { username, password });
    navigate('/')
  };

  const handleExist = () => {
    // Handle user login logic here
    console.log('Logged in:', { username, password });
    navigate('/login')
  };

  return (
    <div className="container">
      <h1>Resigter </h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleExist}>Exist</button>
      </div>
    </div>
  );
};

export default Register;
import React, { useState } from 'react';
import './login.css';

const LoginRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle user registration logic here
    console.log('Registered:', { username, password });
  };

  const handleLogin = () => {
    // Handle user login logic here
    console.log('Logged in:', { username, password });
  };

  return (
    <div className="container">
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginRegister;

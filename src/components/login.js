import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../App';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useGlobalState();

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register')
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { username, password });
      const user = {
        username, password
      }
      dispatch({user: user})
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className='background'>
      <div className="container">
        <h1>Login </h1>
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
          <button onClick={handleLogin}>Login</button>          
          <button onClick={handleRegister}>Register</button>

        </div>
      </div>
    </div>


  );
};

export default Login;

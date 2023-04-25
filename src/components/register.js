import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../App';
import './login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useGlobalState();
  console.log('use global', state)

  const navigate = useNavigate();

  // const handleRegister = () => {
  //   // Handle user registration logic here
  //   console.log('Registered:', { username, password });
  //   const user = {
  //     username, password
  //   }
  //   dispatch({user: user}) //update the whole object
  //   navigate('/')
  // };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', { username, password });
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
  

  const handleExist = () => {
    navigate('/login')
  };

  return (
    <div className='background'>
    <div className="container">
      <h1>Register </h1>
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
        <button onClick={handleExist}>Exit</button>
      </div>
    </div>
        </div>
  );
};

export default Register;
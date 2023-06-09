import React, { useState } from 'react';
import '../styles/authentication.css';
import { connect, useSelector } from 'react-redux';
import { isAuthenticated, login, register } from '../actions/authentication';

const Authentication = ({ loginAction, registerAction }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If user is logged in, redirect to chatbox
  if (isAuthenticated()) {
    window.location.href = '/chat';
    return null;
  }

  const handleLogin = async () => {
    try {
      const res = await loginAction(email, password);
      console.log('Login:', email, password);
      window.location.href = '/chat';
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerAction(name, email, password);
      console.log('Register:', email, password);
      window.location.href = '/chat';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authentication">
      <h2 className="authentication-title">Login/Register</h2>
      <div className="authentication-form">
        <input
          type="text"
          className="authentication-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="authentication-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="authentication-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="authentication-buttons">
          <button className="authentication-button" onClick={handleLogin}>
            Login
          </button>
          <button className="authentication-button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (email, password) => dispatch(login(email, password)),
    registerAction: (name, email, password) => dispatch(register(name, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Authentication);

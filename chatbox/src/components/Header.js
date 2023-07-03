import React from 'react'
import '../styles/header.css'
import { useSelector } from 'react-redux';

const Header = () => {
  const userName = useSelector((state) => state.authentication?.user?.name);

    return (
      <header className="header">
        <div className="container">
          <h1 className="header-title">Welcome to Chatbox, {userName && userName}</h1>
          <p className="header-description">Start a conversation and connect with others</p>
          {userName && <a href="/logout" className="logout">Logout</a>}

        </div>
        
      </header>
    );
};

export default Header
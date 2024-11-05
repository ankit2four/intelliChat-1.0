import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div className="header">
      <div className="logo">IntelliChat</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/login">Login</Link>
        
      </nav>
    </div>
  );
}

export default Header;

import React from 'react';
import './Header.css';
import logo from './GetToGather.png';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="GetToGather" />
      {/* Add navigation links here */}
    </header>
  );
};

export default Header;
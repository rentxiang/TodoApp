import React from 'react';
import astria from '../astria.png'

// header component
const Header = () => {
  return (
    <header style={{ textAlign: 'center' }}>
      <img
        src={astria}
        alt="Header Image"
        style={{ display: 'block', margin: '0 auto' }}
      />
    </header>
  );
};

export default Header;
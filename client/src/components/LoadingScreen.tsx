import React from 'react';
import Logo from '../assets/logo1.png';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="wrapper">
        <img className="loading-logo" src={Logo} alt="Loading logo" />
        <span className="text">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default LoadingScreen;

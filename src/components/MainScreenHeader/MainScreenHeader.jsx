import React from 'react';
import './MainScreenHeader.css';
import MiniLogo from "../../assets/icons/mini-logo.svg";
import HelpBtn from "../../assets/icons/ButtonIcons/button-help.svg";

const MainScreenHeader = () => {
  const handleSupportClick = () => {
    window.open('https://t.me/c/2653287005/3', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='header'>
      <div className="header-logo">
        <div className="header-logo-container">
          <div className="logo-container1"></div>
          <div className="logo-container2"></div>
          <div className="logo-container3"></div>
        </div>
        <img src={MiniLogo} alt="Logo" />
      </div>
      <div className="header-button">
        <button className='help-btn' onClick={handleSupportClick}>
          <div className="btn-img">
            <img src={HelpBtn} alt="Help" />
          </div>
          <div className="btn-text">
            Поддержка
          </div>
        </button>
      </div>
    </div>
  );
};

export default MainScreenHeader;

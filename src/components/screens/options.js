import React from 'react';
import menuBackground from '../../assets/images/menu/menu-background.png';
import optionsButton from '../../assets/images/menu/options-button.png';
import backButtonImage from '../../assets/images/menu/back-button.png';
import '../../styles/common/screens/main_menu.css';

const Options = ({ onBack }) => {
  return (
    <div className="menu" style={{ backgroundImage: `url(${menuBackground})` }}>
      <img
        src={optionsButton}
        alt="Option1"
        className="options-button"
      />
      <img
        src={optionsButton}
        alt="Option2"
        className="options-button"
      />
      <img
        src={optionsButton}
        alt="Option3"
        className="options-button"
      />
      <button className="back-button" onClick={onBack}style={{ backgroundImage: `url(${backButtonImage})` }}></button>
    </div>
  );
};

export default Options;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/screens/Victory.css';
import MenuButtonImage from '../../assets/images/menu/Back-to-Menu.png';
import NewGameButtonImage1 from '../../assets/images/menu/Start-New-Game.png';
import victoryBackground from '../../assets/images/menu/victoryBackground.png';

const Victory = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  const handleNewGameClick = () => {
    navigate('/character-selection');
  };

  return (
    <div
      className="victory-container"
      style={{ backgroundImage: `url(${victoryBackground})` }}
    >
      <div className="victory-text-container">
        <h1>You defeated the KING</h1>
        <h2>There are now peace...</h2>
      </div>
      <div className="button-container1">
      <img
        src={NewGameButtonImage1}
        alt="New Game Button"
        onClick={handleNewGameClick}
        className="new-game-button1"
      />
      <img
        src={MenuButtonImage}
        alt="Menu Button"
        onClick={handleMenuClick}
        className="menu-button1"
      />
      </div>
      <p className="bottom-right-text">But some say Long Live the King...</p>
    </div>
  );
};

export default Victory;

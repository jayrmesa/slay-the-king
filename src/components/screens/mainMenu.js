import React from 'react';
import { useNavigate } from 'react-router-dom';
import menuBackground from '../../assets/images/menu/menu-background.png';
import newGameButton from '../../assets/images/menu/new-game-button.png';
import optionsButton from '../../assets/images/menu/options-button.png';
import quitButton from '../../assets/images/menu/quit-button.png';
import logo from '../../assets/images/menu/Slay-logo.png';
import '../../styles/screens/mainMenu.css';

const Menu = () => {

  const navigate = useNavigate();

  const startNewGame = () => {
    console.log('Starting a new game...');
    navigate('/character-selection');
  };

  const showOptions = () => {
    console.log('Showing options...');
    navigate('/options')
  };

  const onQuit = () => {
    console.log('Quitting the game...');
    // handle quitting the game
  };

  return (
    <div className="menu" style={{ backgroundImage: `url(${menuBackground})` }}>
      <img src={logo} alt="Slay the King" className="logo" />
      <div className="buttons-container">
      <img
        src={newGameButton}
        alt="New Game"
        className="new-game-button"
        onClick={startNewGame}
      />
      <img
        src={optionsButton}
        alt="Options"
        className="options-button"
        onClick={showOptions}
      />
      <img
        src={quitButton}
        alt="Quit"
        className="quit-button"
        onClick={onQuit}
      />
      </div>
    </div>
  );
};

export default Menu;


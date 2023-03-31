import React from 'react';
import menuBackground from '../../assets/images/menu/menu-background.png';
import newGameButton from '../../assets/images/menu/new-game-button.png';
import optionsButton from '../../assets/images/menu/options-button.png';
import quitButton from '../../assets/images/menu/quit-button.png';
import '../../styles/common/screens/main_menu.css';


const Menu = ({ onNewGame, onOptions, onQuit }) => {
  return (
    <div className="menu" style={{ backgroundImage: `url(${menuBackground})` }}>
      <img
        src={newGameButton}
        alt="New Game"
        className="new-game-button"
        onClick={onNewGame}
      />
      <img
        src={optionsButton}
        alt="Options"
        className="options-button"
        onClick={onOptions}
      />
      <img
        src={quitButton}
        alt="Quit"
        className="quit-button"
        onClick={onQuit}
      />
    </div>
  );
};


export default Menu;

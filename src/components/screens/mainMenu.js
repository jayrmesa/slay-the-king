import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../App';
import menuBackground from '../../assets/images/menu/menu-background.png';
import newGameButton from '../../assets/images/menu/new-game-button.png';
import optionsButton from '../../assets/images/menu/options-button.png';
import quitButton from '../../assets/images/menu/quit-button.png';
import '../../styles/screens/mainMenu.css';

const Menu = () => {

  const navigate = useNavigate();
  const [state, dispatch] = useGlobalState();

  const choiceAudio = new Audio(require('../../assets/sounds/music/theme-15.ogg'));

  useEffect(() => {
    console.log(state)
    if (!state.user.username) {
     navigate('/login')      
    } else {
      choiceAudio.play();  
      console.log('state', state)
    }

  }, [state.user]);


  const startNewGame = () => {
    console.log('Starting a new game...');
    navigate('/character-selection');
    choiceAudio.pause();
  };

  const showOptions = () => {
    console.log('Showing options...');
    navigate('/options')
    choiceAudio.pause();
  };

  const onQuit = () => {
    console.log('Quitting the game...');
    // handle quitting the game
    navigate('/login') 
    choiceAudio.pause();
  };

  return (
    <div className="menu" style={{ backgroundImage: `url(${menuBackground})` }}>
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
  );
};

export default Menu;


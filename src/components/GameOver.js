import { useNavigate } from 'react-router-dom';
import './gameover.css';

import ExitButton from '../assets/images/menu/Exit _Button.png'
import NewgameButton from '../assets/images/menu/New game Button.png'
const GameOver = () => {

  const navigate = useNavigate();

  const playAgain = () => {
    navigate('/character-selection')
  }

  const exitGame = () => {
    navigate('/')
  }


  return (
    <div className="game-over-container">
      <div className='main'>
        <h2 className="game-over-title">Game Over!</h2>
        <button className='game-over-exit' onClick={exitGame}>
        <img  src={ExitButton} className='exit-button'/>
        </button>
        <button className="game-over-exit" onClick={playAgain}>
        <img  src={NewgameButton} className='exit-button'/>
        </button>
      </div>

    </div>

  );
}

export default GameOver;


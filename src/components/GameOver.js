import { useNavigate } from 'react-router-dom';
import './gameover.css';
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
        <button className="game-over-button exit-button" onClick={exitGame}>Exit</button>
        <button className="game-over-button play-again-button" onClick={playAgain}>Play Again</button>
      </div>

    </div>

  );
}

export default GameOver;


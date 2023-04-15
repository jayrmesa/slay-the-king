import './gameover.css';
const GameOver = (props) => {
  const {score, exitGame, playAgain} = props
  return (
    <div className="game-over-container">
      <h2 className="game-over-title">Game Over!</h2>
      <p className="game-over-score">Your score: {score}</p>
      <button className="game-over-button exit-button" onClick={exitGame}>Exit</button>
      <button className="game-over-button play-again-button" onClick={playAgain}>Play Again</button>
    </div>
  );
}

export default GameOver;


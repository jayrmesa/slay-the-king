import React from 'react';

const GameOver = (props) => {
  const {score, exitGame, playAgain} = props
  return (
    <div>
      <h2>Game Over!</h2>
      <p>Your score: {score}</p>
      <button onClick={exitGame}>Exit</button>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
}

export default GameOver;

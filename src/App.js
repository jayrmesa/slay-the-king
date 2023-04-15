import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';
import ChoiceRoom from './components/game/choiceRoom';
import Map from './components/game/Map';
import BattleRoom from "./components/game/BattleRoom";
import GameOver from './components/GameOver';

import './App.css';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const score = 100;

  const handleExitGame = () => {
    setGameOver(false);
  }

  const handlePlayAgain = () => {
    setGameOver(false);
    // Reset game state or start a new game
  }

  return (
    <div className="App">
        
      <h1>Game Over</h1>
      {gameOver ? (
        <GameOver score={score} exitGame={handleExitGame} playAgain={handlePlayAgain} />
      ) : (
        <button onClick={() => setGameOver(true)}>Game Over</button>
      )}
  
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/character-selection" element={<CharacterSelection />} />
          <Route path="/choice-room" element={<ChoiceRoom />} />
          <Route path="/map" element={<Map />} />
          <Route path="/battle-room" element={<BattleRoom />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;


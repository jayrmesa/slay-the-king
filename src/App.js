import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';
import ChoiceRoom from './components/game/choiceRoom';
import Map from './components/game/Map';
import Options from './components/screens/options';
import BattleRoom from "./components/game/BattleRoom";
import TreasureRoom from "./components/game/TreasureRoom";

import GameOver from './components/GameOver';
import Login from "./components/login";
import Register from "./components/register";

import './App.css';

function App() {
  const [clearedNodes, setClearedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const clearCurrentNode = () => {
    setClearedNodes(prev => [...prev, currentNode]);
    setCurrentNode(prev => prev + 1);
  };


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/GameOver" element={<GameOver />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 

          <Route path="/" element={<Menu />} />
          <Route
            path="/character-selection"
            element={<CharacterSelection setSelectedCharacter={setSelectedCharacter} />}
          />
          <Route
            path="/choice-room"
            element={<ChoiceRoom selectedCharacter={selectedCharacter} />}
          />
          <Route
            path="/map"
            element={<Map clearedNodes={clearedNodes} currentNode={currentNode} />}
          />
          <Route
            path="/battle-room"
            element={<BattleRoom clearRoom={clearCurrentNode} />}
          />
          <Route
            path="/treasure-room"
            element={<TreasureRoom clearRoom={clearCurrentNode} />}
          />
          <Route path="/options" element={<Options />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



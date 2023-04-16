import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';
import ChoiceRoom from './components/game/choiceRoom';
import Map from './components/game/Map';
import Options from './components/screens/options';
import BattleRoom from "./components/game/BattleRoom";

import './App.css';

function App() {
  const [clearedNodes, setClearedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(1);

  const clearCurrentNode = () => {
    setClearedNodes(prev => [...prev, currentNode]);
    setCurrentNode(prev => prev + 1);
  } 

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/character-selection" element={<CharacterSelection />} />
          <Route path="/choice-room" element={<ChoiceRoom />} />
          <Route path="/map" element={<Map clearedNodes={clearedNodes} currentNode={currentNode}/>} />
          <Route path="/battle-room" element={<BattleRoom clearRoom={clearCurrentNode} />} />
          <Route path="/options" element={<Options />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;


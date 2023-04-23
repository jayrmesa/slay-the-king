import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';
import ChoiceRoom from './components/game/choiceRoom';
import Map from './components/game/Map';
import Options from './components/screens/options';
import BattleRoom from "./components/game/BattleRoom";
import TreasureRoom from "./components/game/TreasureRoom";
import EventRoom from "./components/game/EventRoom";
import FinalBoss from "./components/game/FinalBoss";

import GameOver from './components/GameOver';
import Login from "./components/login";
import Register from "./components/register";

import './App.css';

function App() {
  const [clearedNodes, setClearedNodes] = useState(localStorage.getItem("saveState") ? localStorage.getItem("saveState").clearedNodes : []);
  const [currentNode, setCurrentNode] = useState(localStorage.getItem("saveState") ? localStorage.getItem("saveState").currentNode : 1);

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
            element={<CharacterSelection />}
          />
          <Route
            path="/choice-room"
            element={<ChoiceRoom />}
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
          <Route
            path="/event-room"
            element={<EventRoom clearRoom={clearCurrentNode} />}
          />
          <Route
            path="/final-boss"
            element={<FinalBoss clearRoom={clearCurrentNode} />}
          />
          <Route path="/options" element={<Options
            currentNode={currentNode}
            clearedNodes={clearedNodes} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



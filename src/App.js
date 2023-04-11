import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';
import ChoiceRoom from './components/game/choiceRoom';
import Map from './components/game/Map';
import BattleRoom from "./components/game/BattleRoom";

import './App.css';

function App() {

  return (
    <div className="App">
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


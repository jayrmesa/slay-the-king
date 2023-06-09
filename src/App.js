import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';
import ChoiceRoom from './components/game/choiceRoom';
import Map from './components/game/Map';
import Navbar from './components/screens/_navbar';
import Options from './components/screens/options';
import BattleRoom from "./components/game/BattleRoom";
import TreasureRoom from "./components/game/TreasureRoom";
import EventRoom from "./components/game/EventRoom";
import FinalBoss from "./components/game/FinalBoss";
import Victory from "./components/screens/Victory";

import GameOver from './components/GameOver';
import Login from "./components/login";
import Register from "./components/register";
import './App.css';
import Deck from './components/screens/deck';

const globalState = {
  user: {
    username: null,
    password: 0
  }
}
const globalStateContext = React.createContext(globalState);
const dispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    globalState
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext)
];

//music import
const GameBackgroundAudio = new Audio(require('../src/assets/sounds/music/theme-1.ogg'))

const treastureRoomAudio = new Audio(require('../src/assets/sounds/music/theme-4.ogg'))

GameBackgroundAudio.loop = true;
const playAudio = () => {
GameBackgroundAudio.volume = 0.01
  GameBackgroundAudio.play()
}

const stopAudio = () => {
  GameBackgroundAudio.pause()
}

const treastureRoomPlay = () => {
  treastureRoomPlay.volume = 0.01
  treastureRoomAudio.play()
}

const treastureRoomstop = () => {
  treastureRoomAudio.pause()
}

function App() {

  const savedState = JSON.parse(localStorage.getItem("saveState"));
  const [clearedNodes, setClearedNodes] = useState(savedState ? savedState.clearedNodes : []);
  const [currentNode, setCurrentNode] = useState(savedState ? savedState.currentNode : 1);

  const resetNodes = () => {
    setClearedNodes([]);
    setCurrentNode(1);
  };


  const clearCurrentNode = () => {
    setClearedNodes(prev => [...prev, currentNode]);
    setCurrentNode(prev => prev + 1);
  };


  return (
    <GlobalStateProvider>
      <div className="App">

        <Router>
          <Navbar />
          <Routes>
            <Route path="/GameOver" element={<GameOver resetNodes={resetNodes} stopAudio={stopAudio}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Menu />} />
            <Route
              path="/character-selection"
              element={<CharacterSelection playAudio={playAudio} stopAudio={stopAudio} />}
            />
            <Route
              path="/choice-room"
              element={<ChoiceRoom />}
            />
            <Route
              path="/map"
              element={<Map clearedNodes={clearedNodes} currentNode={currentNode} treastureRoomPlay={treastureRoomPlay} playAudio={playAudio} />}
            />
            <Route
              path="/battle-room"
              element={<BattleRoom clearRoom={clearCurrentNode} playAudio={playAudio} stopAudio={stopAudio} />}
            />
            <Route
              path="/treasure-room"
              element={<TreasureRoom clearRoom={clearCurrentNode} treastureRoomstop={treastureRoomstop} />}
            />
            <Route
              path="/event-room"
              element={<EventRoom clearRoom={clearCurrentNode} />}
            />
            <Route
              path="/final-boss"
              element={<FinalBoss clearRoom={clearCurrentNode} />}
            />
            <Route
              path="/victory"
              element={<Victory resetNodes={resetNodes} />}
            />
            <Route path="/options" element={<Options
              currentNode={currentNode}
              clearedNodes={clearedNodes} />}
            />
            <Route path="/deck" element={<Deck
              currentNode={currentNode}
              clearedNodes={clearedNodes} />}
            />
          </Routes>
        </Router>
      </div>
    </GlobalStateProvider>
  );
}

export default App;



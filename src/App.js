import React, { useState } from 'react';
import Menu from './components/screens/mainMenu';
import CharacterSelection from './components/screens/CharacterSelection';

import ChoiceRoom from './components/game/choiceRoom';
import npcGif from './assets/images/npc/npc.gif';

import roomBackground from './assets/images/menu/choiceRoom.png';

import './App.css';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [roomVisible, setRoomVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  
  const startNewGame = () => {
    console.log('Starting a new game...');
    setShowMenu(false);
    setShowCharacterSelection(true);
    };

  const onSelectCharacter = (character) => {
    console.log(`Character selected: ${character}`);
    setSelectedCharacter(character);
    setShowCharacterSelection(false);
    setRoomVisible(true);
    };

  const handleChoice1 = () => {
    console.log('Increase Health');
    // the player's health here
    };
  
  const handleChoice2 = () => {
    console.log('Get a Card & Lose Health');
    // Add a card to the player's deck and decrease their health 
    };

  const onBack = () => {
    setShowCharacterSelection(false);
    setShowMenu(true);
  };

  const showOptions = () => {
    console.log('Showing options...');
    // show game options here
  };


  return (
    <div className="App">
      {showMenu && <Menu onNewGame={startNewGame} />}
      {showCharacterSelection && (
        <CharacterSelection onSelectCharacter={onSelectCharacter} onBack={onBack} />
      )}
      {roomVisible && (
        <ChoiceRoom
          npcImage={npcGif}
          background={roomBackground} 
          onChoice1={handleChoice1}
          onChoice2={handleChoice2}
          selectedCharacter={selectedCharacter}
          
        />
      )}
    </div>
  );
}
export default App;
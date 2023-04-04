import React, { useState } from 'react';
import Menu from './components/screens/main_menu';
import CharacterSelection from './components/screens/CharacterSelection';
import './App.css';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  
  const startNewGame = () => {
    console.log('Starting a new game...');
    setShowMenu(false);
    setShowCharacterSelection(true);
    };

  const onSelectCharacter = (character) => {
    console.log(`Character selected: ${character}`);
    // Add your logic to start a new game with the selected character here
    };

  const onBack = () => {
    setShowCharacterSelection(false);
    setShowMenu(true);
    };

  const showOptions = () => {
    console.log('Showing options...');
    // logic to show game options here
  };

  const quitGame = () => {
    console.log('Quitting game...');
    // logic to quit the game here
  };

  return (
    <div className="App">
    {showMenu && <Menu onNewGame={startNewGame} />}
    {showCharacterSelection && (
    <CharacterSelection onSelectCharacter={onSelectCharacter} onBack={onBack} />
    )}
    </div>
    );
    }
export default App;
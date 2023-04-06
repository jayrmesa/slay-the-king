import React, { useState } from 'react';
import Menu from './components/screens/main_menu';
import Options from './components/screens/options';
import CharacterSelection from './components/screens/CharacterSelection';
import './App.css';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [showOptions, setShowOptions] = useState(false)
  
  const startNewGame = () => {
    console.log('Starting a new game...');
    setShowMenu(false);
    setShowCharacterSelection(true);
    };

  const onSelectCharacter = (character) => {
    console.log(`Character selected: ${character}`);
    // Add your logic to start a new game with the selected character here
    };

  const onCharactersBack = () => {
    setShowCharacterSelection(false);
    setShowMenu(true);
    };

  const onOptionsBack = () => {
    setShowOptions(false);
    setShowMenu(true);
    };

  const showOptionsPage = () => {
    console.log('Showing options...');
    setShowMenu(false);
    setShowOptions(true);
  };

  const quitGame = () => {
    console.log('Quitting game...');
    // logic to quit the game here
  };

  return (
    <div className="App">
    {showMenu && <Menu onNewGame={startNewGame} onOptions={showOptionsPage} onQuit={quitGame}/>}
    {showCharacterSelection && (
    <CharacterSelection onSelectCharacter={onSelectCharacter} onBack={onCharactersBack} />
    )}
    {showOptions && <Options onBack={onOptionsBack} />}
    </div>
    );
    }
export default App;
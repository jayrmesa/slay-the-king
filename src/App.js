import React from 'react';
import Menu from './components/screens/main_menu';
import './App.css';

function App() {
  const startNewGame = () => {
    console.log('Starting a new game...');
    //  logic to start a new game here
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
      <Menu onNewGame={startNewGame} onOptions={showOptions} onQuit={quitGame} />
    </div>
  );
}

export default App;
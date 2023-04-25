import React from 'react';
import { useNavigate } from 'react-router-dom';
import menuBackground from '../../assets/images/menu/menu-background.png';
import optionsButton from '../../assets/images/menu/options-button.png';
import backButtonImage from '../../assets/images/menu/back-button.png';
import SaveButton from './saveButton';
import '../../styles/screens/mainMenu.css';

const Options = (props) => {

  const navigate = useNavigate();

  // this will be for the volume slider

  // let volume = document.getElementById('volume-slider');
  // volume.addEventListener("change", function(e) {
  //   current_track.volume = e.currentTarget.value / 100;
  // })


  const goBack = () => {
    navigate('/');
  };

  const gameOver = () => {
    navigate('/GameOver');
  }

  return (
    <>
      <div className="menu" style={{ backgroundImage: `url(${menuBackground})` }}>

        {/* this volume slider will need some sort of styling to make it look like the rest of the game
        <input type="range" id="volume-slider" /> */}

        <img
          src={optionsButton}
          alt="Game Over"
          className="options-button"
          onClick={gameOver}
        />

        <SaveButton
          selectedCharacter={props.selectedCharacter}
          currentNode={props.currentNode}
          clearedNodes={props.clearedNodes}
          setClearedNodes={props.setClearedNodes}
          setSelectedCharacter={props.setSelectedCharacter}
          setCurrentNode={props.setCurrentNode}
        />
        <button className="back-button" onClick={goBack} style={{ backgroundImage: `url(${backButtonImage})` }}></button>
      </div>
    </>
  );
};

export default Options;
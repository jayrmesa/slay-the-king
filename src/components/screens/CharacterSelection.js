import React, { useState } from 'react';
import '../../styles/common/screens/CharacterSelection.css';

import character1Img from '../../assets/images/character/character1.png';
import character2Img from '../../assets/images/character/character2.png';
import character3Img from '../../assets/images/character/character3.png';

import backgroundImage from '../../assets/images/menu/background.png';
import backButtonImage from '../../assets/images/menu/back-button.png';
import selectButtonImage from '../../assets/images/menu/select-button.png';

import character1Gif from '../../assets/images/character/character1-gif.gif';
import character2Gif from '../../assets/images/character/character2-gif.gif';
import character3Gif from '../../assets/images/character/character3-gif.gif';

const CharacterSelection = ({ onSelectCharacter, onBack }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    {
      name: 'Warrior',
      image: character1Img,
      gif: character1Gif,
      description: 'description...',
    },
    {
      name: 'Archer',
      image: character2Img,
      gif: character2Gif,
      description: 'description...',
    },
    {
      name: 'Wizard',
      image: character3Img,
      gif: character3Gif,
      description: 'description...',
    },
  ];

  const selectCharacter = (character) => {
    setSelectedCharacter({
      ...character,
      image: character.gif,
    });
  };

  const confirmSelection = () => {
    if (selectedCharacter) {
      onSelectCharacter(selectedCharacter);
    }
  };

  return (
    <div
      className="character-selection"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      { selectedCharacter && ( <div className="character-details">
      <h2>{selectedCharacter.name}</h2>
      <img src={selectedCharacter.image} alt={selectedCharacter.name} />
      <p>{selectedCharacter.description}</p>
      <button
            className="select-button"
            onClick={confirmSelection}
            style={{ backgroundImage: `url(${selectButtonImage})` }}
          ></button>
    </div>
  )}

  <div className="character-list">
    {characters.map((character) => (
    <img
      key={character.name}
      src={character.image}
      alt={character.name}
      onClick={() => selectCharacter(character)}
    />
  ))}
  
  </div>
    <button className="back-button" onClick={onBack}style={{ backgroundImage: `url(${backButtonImage})` }}></button>
  </div>
  );
};



export default CharacterSelection;

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

// Yellow Knight Cards
import yellowAttack1 from "../../assets/images/cards/yellowknight/attack1.png";
import yellowShield1 from "../../assets/images/cards/yellowknight/shield1.png";
import yellowSpecial1 from "../../assets/images/cards/yellowknight/special1.png";

// Green Archer Cards
import greenAttack1 from "../../assets/images/cards/greenarcher/attack1.png";
import greenShield1 from "../../assets/images/cards/greenarcher/shield1.png";
import greenSpecial1 from "../../assets/images/cards/greenarcher/special1.png";

// Red Mage Cards
import redAttack1 from "../../assets/images/cards/redmage/attack1.png";
import redShield1 from "../../assets/images/cards/redmage/shield1.png";
import redSpecial1 from "../../assets/images/cards/redmage/special1.png";

const CharacterSelection = ({ onSelectCharacter, onBack }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    {
      name: 'Yellow Knight',
      image: character1Img,
      gif: character1Gif,
      health: 25,
      maxHealth: 25,
      startingDeck: [
        { id: 1, name: "Attack", image: yellowAttack1 },
        { id: 2, name: "Shield", image: yellowShield1 },
        { id: 3, name: "Special", image: yellowSpecial1 },
      ],
      description: 'description...',
    },
    {
      name: 'Green Archer',
      image: character2Img,
      gif: character2Gif,
      health: 20,
      maxHealth: 20,
      startingDeck: [
        { id: 4, name: "Attack", image: greenAttack1 },
        { id: 5, name: "Shield", image: greenShield1 },
        { id: 6, name: "Special", image: greenSpecial1 },
      ],
      description: 'description...',
    },
    {
      name: 'Red Mage',
      image: character3Img,
      gif: character3Gif,
      health: 15,
      maxHealth: 15,
      startingDeck: [
        { id: 7, name: "Attack", image: redAttack1 },
        { id: 8, name: "Shield", image: redShield1 },
        { id: 9, name: "Special", image: redSpecial1 },
      ],
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

    <div className="starting-deck">
      <h3>Starting Cards</h3>
        {selectedCharacter.startingDeck.map((card) => (
          <div className="starting-card" key={card.id}>
            <img 
            src={card.image} 
            alt={card.name}
            style={{ width: '170px', height: 'auto', margin: '5px' }} 
            />
          </div>
        ))}
    </div>

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

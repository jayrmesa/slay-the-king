import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/screens/CharacterSelection.css';
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

const CharacterSelection = () => {
  const navigate = useNavigate();
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
      description: 'The Yellow Knight is a noble man with a heart of gold. He can mow down enemies with his sword and block incoming attacks with his shield.',
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
      description: "The Green Archer is a fast, stealthy woman with enough power to take down anyone who opposes her. Her defense isn't the best so a few hits and she could be out for good",
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
      description: 'Known for hard hitting spells the Red Mage can blast down foes with ease. But be weary, as the Red Mage is also very fragile, so any hit could be fatal.',
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
      // Pass the selected character to the next component 
      navigate('/choice-room', { state: { selectedCharacter } });
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div
      className="character-selection"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {selectedCharacter && (<div className="character-details">
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
      <button className="back-button" onClick={goBack} style={{ backgroundImage: `url(${backButtonImage})` }}></button>
    </div>
  );
};


export default CharacterSelection;

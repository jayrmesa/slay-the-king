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

import cardDecks from '../common/cardDecks';


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
      startingDeck: cardDecks.character1,
      description: 'description...',
    },
    {
      name: 'Green Archer',
      image: character2Img,
      gif: character2Gif,
      health: 20,
      maxHealth: 20,
      startingDeck: cardDecks.character2,
      description: 'description...',
    },
    {
      name: 'Red Mage',
      image: character3Img,
      gif: character3Gif,
      health: 15,
      maxHealth: 15,
      startingDeck: cardDecks.character3,
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

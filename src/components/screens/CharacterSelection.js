import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/screens/CharacterSelection.css';
import character1Img from '../../assets/images/character/character1.png';
import character2Img from '../../assets/images/character/character2.png';
import character3Img from '../../assets/images/character/character3.png';

import backgroundImage from '../../assets/images/menu/background.png';
import backButtonImage from '../../assets/images/menu/back-button.png';
import selectButtonImage from '../../assets/images/menu/select-button.png';

import character1Gif from '../../assets/images/character/character1.gif';
import character2Gif from '../../assets/images/character/character2.gif';
import character3Gif from '../../assets/images/character/character3.gif';

import yellowAttack1 from '../../assets/images/character/yellowAttack1.gif';
import greenAttack1 from '../../assets/images/character/greenAttack1.gif';
import redAttack1 from '../../assets/images/character/redAttack1.gif';

import yellowHit1 from '../../assets/images/character/yellowHit1.gif';
import greenHit1 from '../../assets/images/character/greenHit1.gif';
import redHit1 from '../../assets/images/character/redHit1.gif';

import yellowSpecialAttack1 from '../../assets/images/character/yellowSpecialAttack1.gif';
import greenSpecialAttack1 from '../../assets/images/character/greenSpecialAttack1.gif';
import redSpecialAttack1 from '../../assets/images/character/redSpecialAttack1.gif';


import { cardDecks, rewardCards } from '../common/cardDecks';


const CharacterSelection = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    {
      name: 'Yellow Knight',
      image: character1Img,
      idleGif: character1Gif,
      attackGif: yellowAttack1,
      specialAttackGif: yellowSpecialAttack1,
      hitGif: yellowHit1,
      health: 25,
      maxHealth: 25,
      startingDeck: cardDecks.character1,
      description: 'description...',
    },
    {
      name: 'Green Archer',
      image: character2Img,
      idleGif: character2Gif,
      attackGif: greenAttack1,
      specialAttackGif: greenSpecialAttack1,
      hitGif: greenHit1,
      health: 20,
      maxHealth: 20,
      startingDeck: cardDecks.character2,
      description: 'description...',
    },
    {
      name: 'Red Mage',
      image: character3Img,
      idleGif: character3Gif,
      attackGif: redAttack1,
      specialAttackGif: redSpecialAttack1,
      hitGif: redHit1,
      health: 15,
      maxHealth: 15,
      startingDeck: cardDecks.character3,
      description: 'description...',
    },
  ];
  
  const selectCharacter = (character) => {
    setSelectedCharacter({
      ...character,
      idleGif: character.idleGif,
      attackGif: character.attackGif,
      specialAttackGif: character.specialAttackGif,
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
        <img src={selectedCharacter.idleGif} alt={selectedCharacter.name} />
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

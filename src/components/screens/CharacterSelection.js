import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../styles/screens/CharacterSelection.css';
import backgroundImage from '../../assets/images/menu/background.png';
import backButtonImage from '../../assets/images/menu/back-button.png';
import selectButtonImage from '../../assets/images/menu/select-button.png';


const CharacterSelection = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState((localStorage.getItem("saveState") ? localStorage.getItem("saveState").selectedCharacter : null));
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('/characters', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then((response) => {
        console.log("response:", response.data);
        setCharacters(response.data);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  const selectCharacter = (character) => {
    setSelectedCharacter({
      ...character,
      idleGif: character.idle_gif,
      attackGif: character.attack_gif,
      specialAttackGif: character.special_attack_gif,
      hitGif: character.hit_gif,
    });
  };

  const confirmSelection = () => {
    if (selectedCharacter) {
      setSelectedCharacter(selectedCharacter);
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
        <div className="character-name">
        <h2>{selectedCharacter.name}</h2>
        </div>
        <img src={selectedCharacter.idleGif} alt={selectedCharacter.name} />

        <div className="character-description">
          <p>{selectedCharacter.description}</p>
        </div>

        <div className="starting-deck">
        <div className="starting-deck-header">
          <h3>Starting Cards</h3>
        </div>
        {selectedCharacter && selectedCharacter.startingDeck && selectedCharacter.startingDeck.map((card) => (
          <div className="starting-card" key={card.id}>
            <img src={card.image_url} alt={card.name} style={{ width: '170px', height: 'auto', margin: '5px' }} />
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
            key={character.id}
            src={character.image_url}
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

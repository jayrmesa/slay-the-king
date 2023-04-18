import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/screens/CharacterSelection.css';
import backgroundImage from '../../assets/images/menu/background.png';
import backButtonImage from '../../assets/images/menu/back-button.png';
import selectButtonImage from '../../assets/images/menu/select-button.png';

const CharacterSelection = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('/api/characters')
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

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
      setSelectedCharacter(selectedCharacter);
      // Pass the selected character to the next component 
      navigate('/choice-room');
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
          {selectedCharacter.cards.map((card) => (
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

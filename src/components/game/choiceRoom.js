import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/game/choiceRoom.css';
import healthBar from '../../assets/images/ui/healthBar.png';
import speechBubble from '../../assets/images/ui/speechBubble.png';
import talkButton from '../../assets/images/ui/talkButton.png';

import npcGif from '../../assets/images/npc/npc.gif';
import roomBackground from '../../assets/images/menu/choiceRoom.png';


const ChoiceRoom = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const selectedCharacter = location.state.selectedCharacter;
  const [character, setCharacter] = useState(selectedCharacter);

  const [displayText, setDisplayText] = useState('Greetings...');
  const [animationKey, setAnimationKey] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const handleTalkButtonClick = () => {
    setDisplayText('Choose wisely...');
    setAnimationKey(animationKey + 1);
    setShowChoices(!showChoices);
  };

  const increaseMaxHealth = () => {
    setCharacter((prevCharacter) => {
      const newMaxHealth = prevCharacter.max_health + 10;
      
      return {
        ...prevCharacter,
        max_health: newMaxHealth,
      };
    });
  };

  const handleChoice1 = () => {
    console.log('Increase Max Health');
    increaseMaxHealth();
  };

  useEffect(() => {
    if (character !== selectedCharacter) {
      navigate("/map", { state: { selectedCharacter: character } });
    }
  }, [character, navigate, selectedCharacter]);

  const handleChoice2 = () => {
    console.log('Get a Card & Lose Health');
    // Add a card to the players deck and decrease their health
  };


  return (
    <div className="room" style={{ backgroundImage: `url(${roomBackground})` }}>
      <img className="npc" src={npcGif} alt="NPC" />

      <div className="character-container">
        <img className="selected-character" src={selectedCharacter.idleGif} alt={selectedCharacter.name} />
      </div>

      <div className="health-bar-choice">
        <img className="health-bar" src={healthBar} alt="Health bar" style={{ width: `${(character.health / character.max_health) * 100}%` }} />
        <span className="health-text">{character.health}/{character.max_health}</span>
      </div>

      <div className="speech-bubble-container" key={animationKey}>
        <img className="speech-bubble" src={speechBubble} alt="Speech bubble" />
        <p className="speech-text">
          {[...displayText].map((char, index) => (
            <span key={index}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>

      {showChoices && (
        <div className="choices">
          <button onClick={handleChoice1}>Increase Max Health</button>
          <button onClick={handleChoice2}>Get a Card & Lose Health</button>
        </div>
      )}

      {!showChoices && (
        <img
          className="talk-button"
          src={talkButton}
          alt="Talk"
          onClick={handleTalkButtonClick}
        />
      )}
    </div>
  );
};

export default ChoiceRoom;
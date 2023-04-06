import React, { useState } from 'react';
import '../../styles/game/choiceRoom.css';

import healthBar from '../../assets/images/ui/healthBar.png';
import speechBubble from '../../assets/images/ui/speechBubble.png';
import talkButton from '../../assets/images/ui/talkButton.png';


const ChoiceRoom = ({ npcImage, onChoice1, onChoice2, background, selectedCharacter }) => {

  const [displayText, setDisplayText] = useState('Greetings...');
  const [animationKey, setAnimationKey] = useState(0);

  const handleTalkButtonClick = () => {
    setDisplayText('Choose wisely...');
    setAnimationKey(animationKey + 1);
  };

  return (
    <div className="room" style={{ backgroundImage: `url(${background})` }}>
      <img className="npc" src={npcImage} alt="NPC" />

      <div className="character-container">
        <img className="selected-character" src={selectedCharacter.image} alt={selectedCharacter.name} />

        <div className="health-bar-container">
          <img className="health-bar" src={healthBar} alt="Health bar" style={{ width: `${(selectedCharacter.health / selectedCharacter.maxHealth) * 100}%` }} />
          <span className="health-text">{selectedCharacter.health}/{selectedCharacter.maxHealth}</span>
        </div>
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

      <img
        className="talk-button"
        src={talkButton}
        alt="Talk"
        onClick={handleTalkButtonClick }
      />


      <div className="choices">
        <button onClick={onChoice1}>Increase Health</button>
        <button onClick={onChoice2}>Get a Card & Lose Health</button>
      </div>
    </div>
  );
};

export default ChoiceRoom;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/game/TreasureRoom.css';
import healthBar from '../../assets/images/ui/healthBar.png';
import speechBubble2 from '../../assets/images/ui/speechBubble.png';
import talkButton2 from '../../assets/images/ui/talkButton.png';

import chest from '../../assets/images/npc/chest.png';
import chestGif from '../../assets/images/npc/chestOpen.gif';

import openChestImage from '../../assets/images/menu/Open-Chest.png';
import dontOpenChestImage from '../../assets/images/menu/Leave-Chest.png';

import roomBackground from '../../assets/images/menu/treasureRoom.png';

const TreasureRoom = ({ clearRoom, currentNode, treastureRoomstop}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCharacter = location.state.selectedCharacter;
  const [character, setCharacter] = useState(selectedCharacter);

  const [displayText, setDisplayText] = useState('Hello?');
  const [showChoices, setShowChoices] = useState(false);
  const [chestOpened, setChestOpened] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  const handleTalkButtonClick = () => {
    if (displayText === 'Weak...') {
      goToMap();
    } else {
      setDisplayText("who's there?");
      setShowChoices(!showChoices);
    }
  };

  const openChest = () => {
    setChestOpened(true);
    setDisplayText('Im free!');

    setRewardMessage('Healed by 10');
    setShowChoices(!showChoices);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: Math.min(prevCharacter.health + 10, prevCharacter.max_health),
    }));
  };


  const dontOpenChest = () => {
    setDisplayText('Weak...');
    setShowChoices(!showChoices);
  };

  const goToMap = () => {
    clearRoom();
    treastureRoomstop()
    navigate('/map', { state: { selectedCharacter: character } });
  };

  return (
    <div className="room2" style={{ backgroundImage: `url(${roomBackground})` }}>
      <img
        className="chest"
        src={chestOpened ? chestGif : chest}
        alt="Chest"
      />

      <div className="character-container1">
        <img
          className="selected-character1"
          src={selectedCharacter.idleGif}
          alt={selectedCharacter.name}
        />
      </div>

      <div className="health-bar-choice1">
        <img
          className="health-bar1"
          src={healthBar}
          alt="Health bar"
          style={{
            width: `${(character.health / character.max_health) * 100}%`,
          }}
        />
        <span className="health-text1">
          {character.health}/{character.max_health}
        </span>
      </div>

      <div className="speech-bubble-container2">
        <img
          className="speech-bubble2"
          src={speechBubble2}
          alt="Speech bubble2"
        />
        <p className="speech-text2">
          {[...displayText].map((char, index) => (
            <span key={index}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>

      {showChoices && (
        <div className="choices1">
          <img
            src={openChestImage} 
            alt="Open the chest"
            onClick={openChest}
            className="choice-image1"
          />
          <img
            src={dontOpenChestImage} 
            alt="Don't open the chest"
            onClick={dontOpenChest}
            className="choice-image1"
          />
        </div>
      )}

      {rewardMessage && <div className="reward-message">{rewardMessage}</div>}

      {!showChoices && (
        <img
          className="talk-button"
          src={talkButton2}
          alt="Talk"
          onClick={handleTalkButtonClick}
        />
      )}

      {(displayText === 'Im free!' || displayText === 'Weak...') && (
        <img
          className="talk-button"
          src={talkButton2}
          alt="Talk"
          onClick={goToMap}
        />
      )}
    </div>
  );
};

export default TreasureRoom;
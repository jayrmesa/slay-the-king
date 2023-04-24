import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/game/TreasureRoom.css';
import healthBar from '../../assets/images/ui/healthBar.png';
import speechBubble2 from '../../assets/images/ui/speechBubble.png';
import talkButton2 from '../../assets/images/ui/talkButton.png';

import chest from '../../assets/images/npc/chest.png';
import chestGif from '../../assets/images/npc/chestOpen.gif';

import roomBackground from '../../assets/images/menu/treasureRoom.png';

const TreasureRoom = ({ clearRoom, currentNode, treastureRoomstop}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCharacter = location.state.selectedCharacter;
  const [character, setCharacter] = useState(selectedCharacter);

  const [displayText, setDisplayText] = useState('...');
  const [animationKey, setAnimationKey] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [chestOpened, setChestOpened] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  const handleTalkButtonClick = () => {
    setDisplayText("hmmm...");
    setShowChoices(!showChoices);
  };

  const openChest = () => {
    setChestOpened(true);
    setDisplayText('Wazah!');

    const randomReward = Math.random() < 0.5;

    if (randomReward) {
      setRewardMessage('Healed by 10');
      setShowChoices(!showChoices);
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        health: prevCharacter.health + 10,
      }));
    } else {
      setRewardMessage('Attack increased by 3');
      // Increase the attack of the character's startingDeck card
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        attack: prevCharacter.startingDeck.attack + 3,
      }));
    }
  };

  const dontOpenChest = () => {
    setDisplayText('Weak...');
    setShowChoices(!showChoices);
    goToMap();
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

      <div className="speech-bubble-container2" key={animationKey}>
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
          <button onClick={openChest}>Open the chest</button>
          <button onClick={dontOpenChest}>Don't open the chest</button>
        </div>
      )}

      {rewardMessage && <div className="reward-message">{rewardMessage}</div>}

      {!showChoices && (
        <img
          className="talk-button2"
          src={talkButton2}
          alt="Talk"
          onClick={handleTalkButtonClick}
        />
      )}

      {(displayText === 'Wazah!' || displayText === 'Weak..') && (
        <img
          className="talk-button3"
          src={talkButton2}
          alt="Talk"
          onClick={goToMap}
        />
      )}
    </div>
  );
};

export default TreasureRoom;
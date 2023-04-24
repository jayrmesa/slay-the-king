import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../../styles/game/choiceRoom.css';
import healthBar from '../../assets/images/ui/healthBar.png';
import speechBubble from '../../assets/images/ui/speechBubble.png';
import talkButton from '../../assets/images/ui/talkButton.png';

import npcGif from '../../assets/images/npc/npc.gif';
import roomBackground from '../../assets/images/menu/choiceRoom.png';

import increaseMaxHealthImage from '../../assets/images/menu/Increase Max Health.png';
import getCardLoseHealthImage from '../../assets/images/menu/Gain Card Loose Health.png';



const ChoiceRoom = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const selectedCharacter = location.state.selectedCharacter;
  const [character, setCharacter] = useState(selectedCharacter);

  const [displayText, setDisplayText] = useState('Greetings...');
  const [animationKey, setAnimationKey] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const [rewardCards, setRewardCards] = useState([]);
  const [showRewardPanel, setShowRewardPanel] = useState(false);

  useEffect(() => {
    axios
      .get("/reward-cards", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response:", response.data);
        setRewardCards(response.data);
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);


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
        health: newMaxHealth,
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
    console.log("Get a Card & Lose Health");
    // Show the reward panel
    setShowRewardPanel(true);
  };

  const handleRewardCardPick = (card) => {
    // Add the selected card to the player's starting deck
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      startingDeck: [...prevCharacter.startingDeck, card],
    }));

    // Decrease the player's health by 5
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: prevCharacter.health - 5,
    }));

    // Hide the reward panel
    setShowRewardPanel(false);
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
          <img
            className="choice-image"
            src={increaseMaxHealthImage}
            alt="Increase Max Health"
            onClick={handleChoice1}
          />
          <img
            className="choice-image"
            src={getCardLoseHealthImage}
            alt="Get a Card & Lose Health"
            onClick={handleChoice2}
          />
        </div>
      )}

      {showRewardPanel && (
        <div className="reward-panel">
          <h2>Select a Card</h2>
          <div className="reward-cards">
            {rewardCards.map((card) => (
              <img
                key={card.id}
                className="card"
                src={card.image_url}
                alt={`Card ${card.id}`}
                onClick={() => handleRewardCardPick(card)}
              />
            ))}
          </div>
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
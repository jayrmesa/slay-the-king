import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from 'use-sound'
import axios from 'axios';

import '../../styles/game/BattleRoom.css';
import monsterGif from '../../assets/images/Monster/idle.gif';
import healthBar from '../../assets/images/ui/healthBar.png';
import monsterAttackGif from "../../assets/images/Monster/attack.gif";
import monsterHitGif from "../../assets/images/Monster/hit.gif";
import battleBackground from '../../assets/images/map/battle.png';
import talkButton from '../../assets/images/ui/talkButton.png';

import block from "../../assets/images/ui/block.png";
import allSpeechBubble from '../../assets/images/ui/speechBubble2.png';

//character
import AttackSoundEffect from '../../assets/sounds/EffectSounds/1.ogg'
import DefendSoundEffect from '../../assets/sounds/EffectSounds/8.ogg'
import UltAttackSoundEffect from '../../assets/sounds/EffectSounds/17.ogg'

import GameBackgroundMusic from '../../assets/sounds/music/theme-1.ogg'


const generateMonsterDamage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generatePlayerShield = (shieldValue) => {
  const shieldArray = [];
  for (let i = 1; i <= shieldValue; i++) {
    shieldArray.push(i);
  }

  return shieldArray;
}

function BattleRoom({ clearRoom,
  currentNode,
  allyIdle = monsterGif,
  allyAttackGif = monsterAttackGif,
  allyHitGif = monsterHitGif,
  backgroundStyle = { backgroundImage: `url(${battleBackground})` },
  initialMonsterHealth = 20,
  isAlly,
  inEventRoom
}) {

  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCharacter } = location.state || {};
  const [character, setCharacter] = useState(selectedCharacter);

  const [monsterHealth, setMonsterHealth] = useState(initialMonsterHealth);
  const monsterMaxHealth = initialMonsterHealth;

  const [monsterCurrentGif, setMonsterCurrentGif] = useState(allyIdle);
  const [monsterAttack, setMonsterAttack] = useState(generateMonsterDamage(3, 7));

  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerAttackGif, setPlayerAttackGif] = useState(null);
  const [showAttackGif, setShowAttackGif] = useState(false);
  const [playerHitGif, setPlayerHitGif] = useState(null);
  const [showPlayerHitGif, setShowPlayerHitGif] = useState(false);

  const [playerShield, setPlayerShield] = useState(0);

  const [showVictoryPanel, setShowVictoryPanel] = useState(false);
  const [rewardCards, setRewardCards] = useState([]);

  const [attackCardCooldown, setAttackCardCooldown] = useState(0);
  const [defendCardCooldown, setDefendCardCooldown] = useState(0);
  const [specialCardCooldown, setSpecialCardCooldown] = useState(0);

  const [showNewSpeechBubble, setShowNewSpeechBubble] = useState(false);
  const [allyDisplayText, setAllyDisplayText] = useState('');


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  //music import
  const ChoiceAudio = new Audio (require ('../../assets/sounds/music/theme-15.ogg'))
  const RewardAudio = new Audio(require ('../../assets/sounds/EffectSounds/33.ogg'))
  const GameOverAudio = new Audio(require ('../../assets/sounds/music/game over.mp3'))


  useEffect(() => {
    setCharacter(selectedCharacter);
    if (selectedCharacter) {
      
      preloadImage(selectedCharacter.attackGif);
      preloadImage(selectedCharacter.hitGif);
      preloadImage(selectedCharacter.idleGif);


      setPlayerAttackGif(selectedCharacter.attackGif);
      setPlayerHitGif(selectedCharacter.hitGif);
    }
  }, [selectedCharacter]);

  useEffect(() => {
    axios.get('/reward-cards', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

      .then((response) => {
        console.log("response:", response.data);
        setRewardCards(response.data);
      })
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  useEffect(() => {

    if (character.health <= 0) {
      console.log('chara.health', character) 
      GameOverAudio.play()
      navigate('/GameOver');

    }
  }, [character.health, navigate]);


  const handleMonsterAttack = async (defense = 0) => {

    // Show the monster's attack GIF
    setMonsterCurrentGif(allyAttackGif);

    // Wait for the attack animation to finish
    await delay(350);

    // Show the player's hit gif
    setShowPlayerHitGif(true);

    // Wait for the hit animation to finish
    await delay(500);

    // Hide the player's hit gif
    setShowPlayerHitGif(false);

    setMonsterAttack(generateMonsterDamage(3, 7));

    // Calculate the damage dealt after accounting for the shield
    const damageDealt = Math.max(monsterAttack - defense, 0);

    // Update the player's shield
    setPlayerShield((prevShield) => Math.max(prevShield - monsterAttack, 0));

    // Update the player's health
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: prevCharacter.health - damageDealt,
    }));

    // Revert the monster's GIF to idle
    setMonsterCurrentGif(allyIdle);

    await delay(300);
    setPlayerShield(0);
    // Set the player's turn back to true
    setPlayerTurn(true);
  };


  const handlePlayerAttack = async (damage, special = false) => {
    if (damage === null) return;

    setPlayerAttackGif(special ? selectedCharacter.specialAttackGif : selectedCharacter.attackGif);
    setShowAttackGif(true);

    // Wait for the attack animation to finish
    await delay(500);

    if (monsterHealth - damage <= 0) {
      setMonsterHealth(0);
      setShowVictoryPanel(true);
    } else {
      // Update the monster's health and show the hit GIF
      setMonsterHealth((prevHealth) => {
        const updatedMonsterHealth = prevHealth - damage;

        // Check if monster's health is at 50% or less
        if (updatedMonsterHealth <= monsterMaxHealth * 0.5) {
          setShowNewSpeechBubble(true);
          setAllyDisplayText('Stop!');
        }

        return updatedMonsterHealth;
      });

      setMonsterCurrentGif(allyHitGif);

      // Wait for the hit animation to finish
      await delay(500);

      // Revert monster's gif to idle and hide the attack GIF
      setMonsterCurrentGif(allyIdle);
      setShowAttackGif(false);

      // Call the monster's attack
      setPlayerTurn(false);
      handleMonsterAttack();
    }

    // Set the attack or special card cooldown
    if (special) {
      setSpecialCardCooldown(2);
    } else {
      setAttackCardCooldown(1);
    }
  };

  const handleCardAttack = (card) => {
    if (!playerTurn) return;

    // Decrement the cooldowns at the beginning of each turn
    setAttackCardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setDefendCardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setSpecialCardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));

    if (
      (card.type === "attack" && attackCardCooldown > 0) ||
      (card.type === "defend" && defendCardCooldown > 0) ||
      (card.type === "special" && specialCardCooldown > 0)
    ) {
      return;
    }

    if (card.type === "defend") {
      handleDefendCard(card); //music
    } else {
      const damage = card.attack;
      console.log(`Card deals ${damage} damage.`);
      handlePlayerAttack(damage, card.type === "special");
    }
  };


  const handleDefendCard = (card) => {
    if (!playerTurn) return;

    // Update the player's shield
    setPlayerShield(card.defense);

    // Call the monster's attack
    setPlayerTurn(false);
    handleMonsterAttack(card.defense);

    // Set the defend card cooldown after the action
    setDefendCardCooldown(1);
  };


  const handleRewardCardPick = (card, callback) => {
    setCharacter((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        startingDeck: [...prevCharacter.startingDeck, card],
      };

      if (callback) {
        callback(updatedCharacter);
      }

      return updatedCharacter;
    });

    setShowVictoryPanel(false);
    clearRoom();
    
  };
  

  const navigateToMap = (updatedCharacter) => {
    navigate("/map", { state: { selectedCharacter: updatedCharacter } });
  };
  
  const allyLowHpConvo = async () => {
    if (allyDisplayText === 'Stop!') {
      setAllyDisplayText("I'm not your enemy");
    } else if (allyDisplayText === "I'm not your enemy") {
      setAllyDisplayText('Lets defeat the king!');
      setShowNewSpeechBubble(true);
    } else if (allyDisplayText === 'Lets defeat the king!') {
      clearRoom();
      navigateToMap(character);
    }
  };

  return (
    <div className="battle-room-container" style={backgroundStyle}>
      <img className="character monster" src={monsterCurrentGif} alt="Monster" />

      {!showAttackGif && !showPlayerHitGif && (
        <img
          className="character player"
          src={selectedCharacter.idleGif}
          alt={selectedCharacter.name}
        />
      )}
      {showAttackGif && (
        <img
          className="character player-attack"
          src={playerAttackGif}
          alt={`${selectedCharacter.name} attack`}
        />
      )}
      {showPlayerHitGif && (
        <img
          className="character player-hit"
          src={playerHitGif}
          alt={`${selectedCharacter.name} hit`}
        />
      )}

      <div className="health-bar-container monster">
        <img
          className="health-bar"
          src={healthBar}
          alt="Monster Health bar"
          style={{
            width: `${(monsterHealth / monsterMaxHealth) * 100}%`,
          }}
        />
        <span className="health-text">
          {monsterHealth}/{monsterMaxHealth}
        </span>
      </div>

      <div className="health-bar-container player">
        <img
          className="health-bar"
          src={healthBar}
          alt="Health bar"
          style={{
            width: `${(character.health / character.max_health) * 100}%`,
          }}
        />
        <span className="health-text">
          {character.health}/{character.max_health}
        </span>
      </div>

      <div className="player-shield-container">
        {generatePlayerShield(playerShield).map((shieldValue) => (
          <img
            key={shieldValue}
            className="player-shield"
            src={block}
            alt="Shield Icon"
          />
        ))}
      </div>

      <span className="monster-attack">
        {monsterAttack}
      </span>

      {
        isAlly && showNewSpeechBubble && (
          <>
            <div className="speech-bubble-container4">
              <img className="speech-bubble4" src={allSpeechBubble} alt="Speech Bubble" />
              <div className="ally-text">
                {allyDisplayText === 'Stop!' ? (
                  <span className="stop-text">Stop!</span>
                ) : (
                  [...allyDisplayText].map((char, index) => (
                    <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
                  ))
                )}
              </div>
            </div>
            <img
              className="talk-button"
              src={talkButton}
              alt="Talk Button"
              onClick={allyLowHpConvo}
            />
          </>
        )
      }

      <div className="card-deck" style={{ display: (showNewSpeechBubble && inEventRoom) ? 'none' : 'flex' }}>
        {character.startingDeck.map((card) => (
          <img
            key={card.id}
            className={`card1 ${card.type === 'attack' && attackCardCooldown > 0 ? 'cooldown' : ''}${card.type === 'defend' && defendCardCooldown > 0 ? 'cooldown' : ''}${card.type === 'special' && specialCardCooldown > 0 ? 'cooldown' : ''}`}
            src={card.image_url}
            alt={`Card ${card.id}`}
            onClick={() => handleCardAttack(card)}
          />
        ))}
      </div>
      {
        showVictoryPanel && (
          <div className="victory-panel">
            <h2>Victory!</h2>
            <p>Select your reward:</p>
            <div className="reward-cards">
              {rewardCards.map((card) => (
                <img
                  key={card.id}
                  className="card"
                  src={card.image_url}
                  alt={`Card ${card.id}`}
                  onClick={() => handleRewardCardPick(card, navigateToMap)}
                />
              ))}
            </div>
          </div>
        )
      }
    </div >
  );
}

export default BattleRoom;

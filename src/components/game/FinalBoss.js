import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../../styles/game/FinalBoss.css';

import bossBackground from '../../assets/images/map/bossBackground.png';
import healthBar from '../../assets/images/ui/healthBar.png';

import allyIdle from '../../assets/images/ally/allyIdle.gif';
import allyAttack from '../../assets/images/ally/allyAttack.gif';

import bossIdle from '../../assets/images/Monster/BossIdle.gif';
import bossAttackGif from '../../assets/images/Monster/BossAttack.gif';
import bossHitGif from '../../assets/images/Monster/BossHit.gif';
import bossSpecialGif from '../../assets/images/Monster/BossSpecial.gif';

import speechBubble from '../../assets/images/ui/speechBubble.png';
import talkButton from '../../assets/images/ui/talkButton.png';

import block from "../../assets/images/ui/block.png";

const generateBossDamage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateAllyDamage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generatePlayerShield = (shieldValue) => {
  const shieldArray = [];
  for (let i = 1; i <= shieldValue; i++) {
    shieldArray.push(i);
  }

  return shieldArray;
}

const FinalBoss = () => {
  const [bossSpeech, setBossSpeech] = useState('So you made it');
  const [showTalkButton, setShowTalkButton] = useState(true);
  const [bossSpeech1, setBossSpeech1] = useState('Its not over!');

  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCharacter } = location.state || {};
  const [character, setCharacter] = useState(selectedCharacter);

  //Boss
  const [bossHealth, setBossHealth] = useState(40);
  const bossMaxHealth = 40;
  const [bossGif, setBossGif] = useState(bossIdle);
  const [bossAttack, setBossAttack] = useState(generateBossDamage(3, 12));
  const [showVictoryDialog, setShowVictoryDialog] = useState(false);

  //Player
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerAttack, setPlayerAttack] = useState(null);
  const [showAttack, setShowAttackGif] = useState(false);
  const [playerHit, setPlayerHit] = useState(null);
  const [showPlayerHit, setShowPlayerHit] = useState(false);
  const [playerShield, setPlayerShield] = useState(0);
  const [attackCardCooldown, setAttackCardCooldown] = useState(0);
  const [defendCardCooldown, setDefendCardCooldown] = useState(0);
  const [specialCardCooldown, setSpecialCardCooldown] = useState(0);
  const [attack1CardCooldown, setAttack1CardCooldown] = useState(0);
  const [attack2CardCooldown, setAttack2CardCooldown] = useState(0);
  const [defend1CardCooldown, setDefend1CardCooldown] = useState(0);

  //Ally
  const [allyAttackGif, setAllyAttackGif] = useState(null);
  const [showAllyAttack, setAllyShowAttack] = useState(false);
  const [allyAttackDamage, setallyAttackDamage] = useState(generateAllyDamage(4, 8));

  //shakeScreen
  const [shakeScreen, setShakeScreen] = useState(false);
  const [showBossAttack, setShowBossAttack] = useState(false);

  const [showBattleElements, setShowBattleElements] = useState(false);
  const [hideSpeechBubble, setHideSpeechBubble] = useState(false);

  const [bossFurious, setBossFurious] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //music import
  const GameOverAudio = new Audio(require('../../assets/sounds/music/game over.mp3'))

  useEffect(() => {
    setCharacter(selectedCharacter);
    if (selectedCharacter) {
      setPlayerAttack(selectedCharacter.attackGif);
      setPlayerHit(selectedCharacter.hitGif);
    }
  }, [selectedCharacter]);

  useEffect(() => {
    if (bossSpeech === 'So you made it') {
      setShowBossAttack(true);

      setTimeout(() => {
        setShowBossAttack(false);
      }, 2050); // Duration of the bossSpecialGif

      setTimeout(() => {
        setShakeScreen(true);

        setTimeout(() => {
          setShakeScreen(false);
        }, 1000); // Duration of the shake effect
      }, 2050); // Delay the shake effect to start after the bossSpecialGif finishes
    }
  }, [bossSpeech]);

  useEffect(() => {
    if (bossHealth === 0 || bossHealth < 0) {
      setBossAttack(0)
      setShowBattleElements(false);
      setShowVictoryDialog(true);
    }
  }, [bossHealth]);

  const handleVictoryDialogClick = () => {
    if (bossSpeech1 === 'Its not over!') {
      setShowBattleElements(false);
      setBossSpeech1("I'll be back");
    } else {
      navigate('/victory');
    }
  };

  useEffect(() => {

    if (character.health <= 0) {
      console.log('chara.health', character)
      GameOverAudio.play()
      navigate('/GameOver');

    }
  }, [character.health, navigate]);


  const handleTalkButtonClick = () => {
    if (bossSpeech === 'So you made it') {
      setBossSpeech('Such a waste');
    } else if (bossSpeech === 'Such a waste') {
      setShowTalkButton(false);
      setShowBattleElements(true);
      setHideSpeechBubble(true);
    }
  };

  const extraFuriousDamage = 2;

  const handleBossAttack = async (defense = 0) => {
    // Show the Boss attack 
    setBossGif(bossAttackGif);

    // Wait for the attack animation to finish
    await delay(1050);

    // Show the player's hit gif
    setShowPlayerHit(true);

    // Wait for the hit animation to finish
    await delay(500);

    // Hide the player's hit gif
    setShowPlayerHit(false);

    const newBossAttack = generateBossDamage(3, 12) + (bossFurious ? extraFuriousDamage : 0);
    setBossAttack(newBossAttack);

    // Calculate the damage dealt after accounting for the shield
    const damageDealt = Math.max(bossAttack - defense, 0);

    // Update the player's shield
    setPlayerShield((prevShield) => Math.max(prevShield - bossAttack, 0));

    // Update the player's health
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: prevCharacter.health - damageDealt,
    }));

    // Revert the monster's GIF to idle
    setBossGif(bossIdle);

    await delay(300);
    setPlayerShield(0);
    // Set the player's turn back to true
    setPlayerTurn(true);
  };

  const handleAllyAttack = async () => {
    setAllyShowAttack(true); // Add this line
    setAllyAttackGif(allyAttack);

    // Wait for the attack animation to finish
    await delay(700);

    // Hide the attack GIF
    setAllyShowAttack(false);

    // Reset the attack animation
    setAllyAttackGif(null);
    await delay(50);

    setallyAttackDamage(generateAllyDamage(4, 8));

    // Update the monster's health and show the hit GIF
    setBossHealth((prevHealth) => {
      const updatedBossHealth = prevHealth - allyAttackDamage;
      if (updatedBossHealth / bossMaxHealth <= 0.4 && !bossFurious) {
        setBossFurious(true);
        setShakeScreen(true);

        setTimeout(() => {
          setShakeScreen(false);
        }, 1000);
      }
      return updatedBossHealth;
    });

    setBossGif(bossHitGif);

    // Wait for the hit animation to finish
    await delay(750);

    // Revert monster's gif to idle
    setBossGif(bossIdle);
  };



  const handlePlayerAttack = async (damage, cardType = 'attack') => {
    if (damage === null) return;

    setPlayerAttack(cardType === 'special' ? selectedCharacter.specialAttackGif : selectedCharacter.attackGif);
    setShowAttackGif(true);

    const attackAnimationDelay = cardType === 'special' ? 2050 : 800;

    // Wait for the attack animation to finish
    await delay(attackAnimationDelay);

    // Hide the attack GIF
    setShowAttackGif(false);

    // Reset the attack animation
    setPlayerAttack(null);
    await delay(50);


    if (bossHealth - damage <= 0) {
      setBossHealth(0);
    } else {
      // Update the monster's health 
      setBossHealth((prevHealth) => {
        const updatedBossHealth = prevHealth - damage;
        if (updatedBossHealth / bossMaxHealth <= 0.4 && !bossFurious) {
          setBossFurious(true);
          setShakeScreen(true);

          setTimeout(() => {
            setShakeScreen(false);
          }, 1000);
        }
        return updatedBossHealth;
      });

      setBossGif(bossHitGif);

      // Wait for the hit animation to finish
      await delay(750);

      // Revert monster's gif to idle
      setBossGif(bossIdle);

      // Call the ally's attack
      await handleAllyAttack();

      // Call the monster's attack
      setPlayerTurn(false);
      handleBossAttack();
    }

    // Set the card cooldown based on the card type
    switch (cardType) {
      case 'attack':
        setAttackCardCooldown(1);
        break;
      case 'attack1':
        setAttack1CardCooldown(1);
        break;
      case 'attack2':
        setAttack2CardCooldown(2);
        break;
      case 'defend1':
        setDefend1CardCooldown(1);
        break;
      case 'special':
        setSpecialCardCooldown(2);
        break;
      default:
        console.warn(`Unknown card type: ${cardType}`);
    }
  };


  const handleCardAttack = (card) => {
    if (!playerTurn) return;

    // Decrement the cooldowns at the beginning of each turn
    setAttackCardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setDefendCardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setSpecialCardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setAttack1CardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setAttack2CardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
    setDefend1CardCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));

    // Check if the card is on cooldown
    const cardCooldown = {
      attack: attackCardCooldown,
      attack1: attack1CardCooldown,
      attack2: attack2CardCooldown,
      defend: defendCardCooldown,
      defend1: defend1CardCooldown,
      special: specialCardCooldown,
    };

    if (cardCooldown[card.type] > 0) return;

    if (card.type === "defend" || card.type === "defend1") {
      handleDefendCard(card);
    } else {
      const damage = card.attack;
      console.log(`Card deals ${damage} damage.`);
      handlePlayerAttack(damage, card.type);
    }

    // Set the appropriate cooldown for the card type
    const setCooldown = {
      attack: setAttackCardCooldown,
      attack1: setAttack1CardCooldown,
      attack2: setAttack2CardCooldown,
      defend: setDefendCardCooldown,
      defend1: setDefend1CardCooldown,
      special: setSpecialCardCooldown,
    };

    const cooldownDuration = {
      attack: 1,
      attack1: 1,
      attack2: 2,
      defend: 1,
      defend1: 1,
      special: 2,
    };

    setCooldown[card.type](cooldownDuration[card.type]);
  };

  const handleDefendCard = (card) => {
    if (!playerTurn) return;

    // Update the player's shield
    setPlayerShield(card.defense);

    // Call the monster's attack
    setPlayerTurn(false);
    handleBossAttack(card.defense);

    // Set the defend card cooldown after the action
    setDefendCardCooldown(1);
  };


  return (
    <div
      className={`final-boss-container${shakeScreen ? ' shake' : ''}`}
      style={{ backgroundImage: `url(${bossBackground})` }}
    >
      <img
        className="character-boss"
        src={showBossAttack ? bossSpecialGif : bossGif}
        alt="Boss"
      />

      {!showAllyAttack && (
        <img
          className="character-ally"
          src={allyIdle}
          alt="Ally"
        />
      )}

      {showAllyAttack && (
        <img
          className="character-ally-attack"
          src={allyAttackGif}
          alt="Ally attack"
        />
      )}

      {selectedCharacter && !showAttack && !showPlayerHit && (
        <img
          className="character player"
          src={selectedCharacter.idleGif}
          alt={selectedCharacter.name}
        />
      )}
      {showAttack && (
        <img
          className="character player-attack"
          src={playerAttack}
          alt={`${selectedCharacter.name} attack`}
        />
      )}
      {showPlayerHit && (
        <img
          className="character player-hit"
          src={playerHit}
          alt={`${selectedCharacter.name} hit`}
        />
      )}


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

      <div className="health-bar-container1 player">
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

      <div className="health-bar-container1 boss">
        <img
          className="health-bar"
          src={healthBar}
          alt="boss Health bar"
          style={{
            width: `${(bossHealth / bossMaxHealth) * 100}%`,
          }}
        />
        <span className="health-text">
          {bossHealth}/{bossMaxHealth}
        </span>
      </div>

      <div className={`speech-bubble-container${(showBattleElements || hideSpeechBubble) ? ' hidden' : ''}`}>
        <img className="speech-bubble" src={speechBubble} alt="Speech Bubble" />
        <div className="boss-text">
          {[...bossSpeech].map((char, index) => (
            <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </div>
      </div>

      {showBattleElements && (
        <span className="boss-attack">
          {bossAttack}
        </span>
      )}

      {bossFurious && (
        <div className="boss-furious-notification">
          One-eye King is now furious
        </div>
      )}

      {showBattleElements && (
        <span className="ally-attack">
          {allyAttackDamage}
        </span>
      )}

      {showBattleElements && (
        <div className="card-deck">
          {character.startingDeck.map((card) => (
            <img
              key={card.id}
              className={`card1 ${card.type === 'attack' && attackCardCooldown > 0 ? 'cooldown' : ''}${card.type === 'attack1' && attack1CardCooldown > 0 ? 'cooldown' : ''}${card.type === 'attack2' && attack2CardCooldown > 0 ? 'cooldown' : ''}${card.type === 'defend' && defendCardCooldown > 0 ? 'cooldown' : ''}${card.type === 'defend1' && defend1CardCooldown > 0 ? 'cooldown' : ''}${card.type === 'special' && specialCardCooldown > 0 ? 'cooldown' : ''}`}
              src={card.image_url}
              alt={`Card ${card.id}`}
              onClick={() => handleCardAttack(card)}
            />
          ))}
        </div>
      )}

      {showVictoryDialog && (
        <div className="speech-bubble-container">
          <img className="speech-bubble" src={speechBubble} alt="Speech Bubble" />
          <p className="speech-text">{bossSpeech1}</p>
        </div>
      )}

      {showVictoryDialog && (
        <img
          className="talk-button"
          src={talkButton}
          alt="Talk Button"
          onClick={handleVictoryDialogClick}
        />
      )}

      {showTalkButton && (
        <img
          className="talk-button"
          src={talkButton}
          alt="Talk Button"
          onClick={handleTalkButtonClick}
        />
      )}

    </div>
  );
};

export default FinalBoss;

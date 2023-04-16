import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../../styles/game/BattleRoom.css';
import monsterGif from '../../assets/images/Monster/idle.gif';
import healthBar from '../../assets/images/ui/healthBar.png';

import monsterAttackGif from "../../assets/images/Monster/attack.gif";
import monsterHitGif from "../../assets/images/Monster/hit.gif";

import { cardDecks, rewardCards } from '../common/cardDecks';


function BattleRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedCharacter } = location.state || {};
  const [character, setCharacter] = useState(selectedCharacter);

  const [monsterHealth, setMonsterHealth] = useState(12);
  const monsterMaxHealth = 12;
  const [monsterCurrentGif, setMonsterCurrentGif] = useState(monsterGif);
  const [monsterAttack] = useState(Math.floor(Math.random() * 7) + 3);

  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerAttackGif, setPlayerAttackGif] = useState(null);
  const [showAttackGif, setShowAttackGif] = useState(false);
  const [playerHitGif, setPlayerHitGif] = useState(null);
  const [showPlayerHitGif, setShowPlayerHitGif] = useState(false);

  const [showVictoryPanel, setShowVictoryPanel] = useState(false);

  useEffect(() => {
    setCharacter(selectedCharacter);
    if (selectedCharacter) {
      setPlayerAttackGif(selectedCharacter.attackGif);
      setPlayerHitGif(selectedCharacter.hitGif);
    }
  }, [selectedCharacter]);

  const handleMonsterAttack = async () => {

    // Show the monster's attack GIF
    setMonsterCurrentGif(monsterAttackGif);

    // Wait for the attack animation to finish
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Show the player's hit gif
    setShowPlayerHitGif(true);

    // Wait for the hit animation to finish
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Hide the player's hit gif
    setShowPlayerHitGif(false);

    // Update the player's health
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: prevCharacter.health - monsterAttack,
    }));

    // Revert the monster's GIF to idle
    setMonsterCurrentGif(monsterGif);

    // Set the player's turn back to true
    setPlayerTurn(true);
  };


  const handlePlayerAttack = async (damage, special = false) => {
    if (damage === null) return;

    setPlayerAttackGif(special ? selectedCharacter.specialAttackGif : selectedCharacter.attackGif);
    setShowAttackGif(true);

    // Wait for the attack animation to finish
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (monsterHealth - damage <= 0) {
      setMonsterHealth(0);
      setShowVictoryPanel(true);
    } else {
      // Update the monster's health and show the hit GIF
      setMonsterHealth((prevHealth) => prevHealth - damage);
      setMonsterCurrentGif(monsterHitGif);

      // Wait for the hit animation to finish
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Revert monster's gif to idle and hide the attack GIF
      setMonsterCurrentGif(monsterGif);
      setShowAttackGif(false);

      // Call the monster's attack
      setPlayerTurn(false);
      handleMonsterAttack();
    }
  };

  const handleCardAttack = (card) => {
    if (!playerTurn) return;

    if (card.type === 'defend') {
      handleDefendCard(card);
    } else {
      const damage = card.attack;
      console.log(`Card deals ${damage} damage.`);

      handlePlayerAttack(damage, card.type === 'special');
    }
  };

  const handleDefendCard = (card) => {
    if (!playerTurn) return;

    const defense = card.defense;
    console.log(`Card provides ${defense} defense.`);

    // Update the player's health
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      health: Math.min(prevCharacter.health + defense, prevCharacter.maxHealth),
    }));

    // Call the monster's attack
    setPlayerTurn(false);
    handleMonsterAttack();
  };

  const handleRewardCardPick = (card) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      startingDeck: [...prevCharacter.startingDeck, card],
    }));

    setShowVictoryPanel(false);
    navigate("/map", { state: { selectedCharacter: character } });
  };

  return (
    <div className="battle-room-container">
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
      <div className="player-shadow"></div>

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
            width: `${(character.health / character.maxHealth) * 100}%`,
          }}
        />
        <span className="health-text">
          {character.health}/{character.maxHealth}
        </span>
      </div>

      <span className="monster-attack character-shadow">
        {monsterAttack}
      </span>

      <div className="card-deck">
        {character.startingDeck.map((card) => (
          <img
            key={card.id}
            className="card"
            src={card.image}
            alt={`Card ${card.id}`}
            onClick={() => handleCardAttack(card)}
          />
        ))}
      </div>
      {showVictoryPanel && (
        <div className="victory-panel">
          <h2>Victory!</h2>
          <p>Select your reward:</p>
          <div className="reward-cards">
            {rewardCards.map((card) => (
              <img
                key={card.id}
                className="card"
                src={card.image}
                alt={`Card ${card.id}`}
                onClick={() => handleRewardCardPick(card)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BattleRoom;

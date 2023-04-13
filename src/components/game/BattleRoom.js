import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../../styles/game/BattleRoom.css';
import monsterGif from '../../assets/images/Monster/idle.gif';
import healthBar from '../../assets/images/ui/healthBar.png';


function BattleRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCharacter } = location.state || {};

  const [character, setCharacter] = useState(selectedCharacter);

  const [monsterHealth, setMonsterHealth] = useState(10);
  const monsterMaxHealth = 10;
  const [playerTurn, setPlayerTurn] = useState(true);
  const [monsterAttack, setMonsterAttack] = useState(Math.floor(Math.random() * 4) + 1);

  useEffect(() => {
    if (!playerTurn) {
      setTimeout(() => {
        const randomAttack = Math.floor(Math.random() * 4) + 1;
        console.log(`Monster deals ${monsterAttack} damage.`);

        // Update player's health 
        setCharacter((prevCharacter) => ({
          ...prevCharacter,
          health: prevCharacter.health - monsterAttack,
        }));

        // Update the monster's attack for the next turn
        setMonsterAttack(randomAttack);

        setPlayerTurn(true);
      }, 1000);
    }
  }, [playerTurn]);


  const handleCardAttack = (card) => {
    if (!playerTurn) return;

    const damage = card.attack;
    console.log(`Card deals ${damage} damage.`);
    setMonsterHealth((prevHealth) => prevHealth - damage);
    setPlayerTurn(false);
  };


  return (
    <div className="battle-room-container">
      <img className="character monster" src={monsterGif} alt="Monster" />
      <img className="character player" src={character.image} alt={character.name} />

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

      <span className="monster-attack">
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
    </div>
  );
}

export default BattleRoom;

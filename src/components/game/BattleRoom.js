import { useState, useEffect } from "react";

import '../../styles/game/BattleRoom.css';
import { useLocation, useNavigate } from "react-router-dom";
import monsterGif from '../../assets/images/Monster/idle.gif';
import healthBar from '../../assets/images/ui/healthBar.png';

function BattleRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCharacter } = location.state || {};

  const [character, setCharacter] = useState(selectedCharacter);

  useEffect(() => {
    setCharacter(selectedCharacter);
  }, [selectedCharacter]);
  

  if (!selectedCharacter) {
    return (
      <div>
        <h1>No character selected</h1>
        <button onClick={() => navigate("/character-selection")}>
          Go to Character Selection
        </button>
      </div>
    );
  }

  return (
    <div className="battle-room-container">
      <img className="character monster" src={monsterGif} alt="Monster" />
      <img className="character player" src={character.image} alt={character.name} />
  
      <div className="health-bar-container">
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
    </div>
  );
}

export default BattleRoom;

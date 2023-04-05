import React from 'react';
import '../../styles/common/game/choiceRoom.css';
import healthBar from '../../assets/images/ui/healthBar.png';


const Room = ({ npcImage, onChoice1, onChoice2, background, selectedCharacter }) => {
  return (
    <div className="room" style={{ backgroundImage: `url(${background})` }}>
      <img className="npc" src={npcImage} alt="NPC" />
      <img className="selected-character" src={selectedCharacter.image} alt={selectedCharacter.name} />

      <div className="health-bar-container">
        <img className="health-bar" src={healthBar} alt="Health bar" />
        <span className="health-text">{selectedCharacter.health}/{selectedCharacter.maxHealth}</span>
      </div>
      
      <div className="choices">
        <button onClick={onChoice1}>Increase Health</button>
        <button onClick={onChoice2}>Get a Card & Lose Health</button>
      </div>
    </div>
  );
};

export default Room;




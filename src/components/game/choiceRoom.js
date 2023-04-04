import React from 'react';
import '../../styles/common/game/choiceRoom.css';

const Room = ({ npcImage, onChoice1, onChoice2, background, selectedCharacter }) => {
  return (
    <div className="room" style={{ backgroundImage: `url(${background})` }}>
      <img className="npc" src={npcImage} alt="NPC" />
      <img className="selected-character" src={selectedCharacter.image} alt={selectedCharacter.name} />
      <div className="choices">
        <button onClick={onChoice1}>Increase Health</button>
        <button onClick={onChoice2}>Get a Card & Lose Health</button>
      </div>
    </div>
  );
};

export default Room;




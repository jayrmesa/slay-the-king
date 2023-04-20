import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/game/EventRoom.css';
import speechBubble from '../../assets/images/ui/speechBubble.png';
import healthBar from '../../assets/images/ui/healthBar.png';
import talkButton from '../../assets/images/ui/talkButton.png';
import allyIdle from '../../assets/images/npc/ally.gif';
import roomBackground from '../../assets/images/menu/eventRoom.png';

import allyAttackGif from '../../assets/images/npc/allyAttack.gif';
import allyHitGif from '../../assets/images/npc/allyHit.gif';


import BattleRoom from './BattleRoom';

const EventRoom = ({ clearRoom, currentNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCharacter = location.state.selectedCharacter;
  const [character, setCharacter] = useState(selectedCharacter);

  const [allyDisplayText, setAllyDisplayText] = useState('Hey, I know you...');
  const [traitorTextVisible, setTraitorTextVisible] = useState(false);

  const [step, setStep] = useState(0);
  const [isBattleStarted, setIsBattleStarted] = useState(false);

  const handleTalkButtonClick = () => {
    if (step === 0) {
      setAllyDisplayText('');
      setTraitorTextVisible(true);
      setStep(1);
    } else if (step === 1) {
      setIsBattleStarted(true);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${roomBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  

  return (
    <div className="room3" style={{ backgroundImage: `url(${roomBackground})` }}>
      {!isBattleStarted && (
        <>
          <img className="selected ally" src={allyIdle} alt="ALLY" />
          <div className="speech-bubble-container3">
            <img className="speech-bubble3" src={speechBubble} alt="Speech bubble" />
            <p className="speech-text3">
              {[...allyDisplayText].map((char, index) => (
                <span key={index}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
            {traitorTextVisible && (
              <div className="speech-text3-traitor">
                Traitor!
              </div>
            )}
          </div>
          <div className="character-container2">
            <img
              className="selected character2"
              src={selectedCharacter.idleGif}
              alt={selectedCharacter.name}
            />
          </div>
          <div className="health-bar-container2">
            <img
              className="health-bar2"
              src={healthBar}
              alt="Health bar"
              style={{
                width: `${(character.health / character.max_health) * 100}%`,
              }}
            />
            <span className="health-text2">
              {character.health}/{character.max_health}
            </span>
          </div>
          <img
            className="talk-button"
            src={talkButton}
            alt="Talk"
            onClick={handleTalkButtonClick}
          />
        </>
      )}

      {isBattleStarted && (
        <BattleRoom
          clearRoom={() => {
            setIsBattleStarted(false);
            clearRoom();
          }}
          selectedCharacter={selectedCharacter}
          monsterIdleGif={allyIdle}
          monsterAttackGif={allyAttackGif}
          monsterHitGif={allyHitGif}
          backgroundStyle={backgroundStyle}
        />
      )}

    </div>
  );
};

export default EventRoom;


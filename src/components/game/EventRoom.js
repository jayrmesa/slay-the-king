import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../styles/game/EventRoom.css';
import speechBubble from '../../assets/images/ui/speechBubble.png';
import playerSpeechBubble from '../../assets/images/ui/speechBubble2.png';
import healthBar from '../../assets/images/ui/healthBar.png';
import talkButton from '../../assets/images/ui/talkButton.png';
import allyIdle from '../../assets/images/npc/ally.gif';
import roomBackground from '../../assets/images/menu/eventRoom.png';

import BattleRoom from './BattleRoom';

const EventRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPlayerSpeechBubble, setShowPlayerSpeechBubble] = useState(false);
  const selectedCharacter = location.state.selectedCharacter;
  const [character, setCharacter] = useState(selectedCharacter);

  const [displayText, setDisplayText] = useState('Traitor!');
  const [step, setStep] = useState(0);
  const [isBattleStarted, setIsBattleStarted] = useState(false);

  const handleTalkButtonClick = () => {
    if (step === 0) {
      setDisplayText('Wait...');
      setShowPlayerSpeechBubble(true);
      setStep(1);
    } else if (step === 1) {
      setIsBattleStarted(true);
    }
  };

  return (
    <div className="room3" style={{ backgroundImage: `url(${roomBackground})` }}>
      {!isBattleStarted && (
        <>
          <img className="selected ally" src={allyIdle} alt="ALLY" />
          <div className="speech-bubble-container3">
            <img className="speech-bubble3" src={speechBubble} alt="Speech bubble" />
            <p className="speech-text3">
              {[...displayText].map((char, index) => (
                <span key={index}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>
          {showPlayerSpeechBubble && (
            <div className="player-speech-bubble-container">
              <img className="player-speech-bubble" src={playerSpeechBubble} alt="Player speech bubble" />
              <p className="player-speech-text">
                {[...displayText].map((char, index) => (
                  <span key={index}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>
            </div>
          )}
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
          clearRoom={() => setIsBattleStarted(false)}
          currentNode={null} // Replace with the current node if needed
        />
      )}
    </div>
  );
};

export default EventRoom;




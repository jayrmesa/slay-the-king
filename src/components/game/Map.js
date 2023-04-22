import React, { useState } from 'react';
import '../../styles/game/map.css';
import monsterImage from '../../assets/images/map/monster.png';
import treasureImage from '../../assets/images/map/treasure.png';
import eventImage from '../../assets/images/map/event.png';
import bossImage from '../../assets/images/map/boss.png';
import { useLocation, useNavigate } from "react-router-dom";


const Map = ({ clearedNodes, currentNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCharacter = location.state?.selectedCharacter;

  const handleNodeClick = (node) => {
      // Navigate to the respective room based on the node
      switch (node) {
        case 1:
          navigate("/battle-room", { state: { selectedCharacter } });
          break;
        case 2:
          navigate("/treasure-room", { state: { selectedCharacter } });
          break;
        case 3:
          navigate("/event-room", { state: { selectedCharacter } });
          break;
        case 4:
          navigate("/final-boss", { state: { selectedCharacter } });
          break;
        default:
          
          break;
      }
  }

  const nodes = [
    { node: 1, className: "start-node", onClick: () => handleNodeClick(1), image: monsterImage },
    { node: 2, className: "node-2", onClick: () => handleNodeClick(2), image: treasureImage },
    { node: 3, className: "node-3", onClick: () => handleNodeClick(3), image: eventImage },
    { node: 4, className: "final-boss-node", onClick: () => handleNodeClick(4), image: bossImage },
  ];

  return (
    <div className="map-container" >
      {nodes.map(({ node, className, onClick, image }) => (
        <img
          key={node}
          className={`map-node ${className}${node === currentNode ? ' clickable' : ''}`}
          src={image}
          alt={`Node ${node}`}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

export default Map;

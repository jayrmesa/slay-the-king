import React, { useState } from 'react';
import '../../styles/game/map.css';
import monsterImage from '../../assets/images/map/monster.png';
import treasureImage from '../../assets/images/map/treasure.png';
import eventImage from '../../assets/images/map/event.png';
import bossImage from '../../assets/images/map/boss.png';
import { useLocation, useNavigate } from "react-router-dom";


const Map = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCharacter = location.state?.selectedCharacter;
  const [clearedNodes, setClearedNodes] = useState([1]);


  const handleNodeClick = (node) => {
    if (clearedNodes.includes(node)) {
      const nextNodes = getNextNodes(node);
      setClearedNodes((prevClearedNodes) => [...prevClearedNodes, ...nextNodes]);

      // Navigate to the respective room based on the node
      if (node === 1)
      navigate("/battle-room", { state: { selectedCharacter } });    
      // Add navigation for other rooms 
    }
  };


  const getNextNodes = (currentNode) => {
    switch (currentNode) {
      case 1:
        return [2];
      case 2:
        return [3];
      case 3:
        return [4];
      default:
        return [];
    }
  };

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
          className={`map-node ${className}${clearedNodes.includes(node) ? ' cleared' : ''}`}
          src={image}
          alt={`Node ${node}`}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default Map;

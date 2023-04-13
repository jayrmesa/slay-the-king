import React, { useState } from 'react';
import '../../styles/game/map.css';
import nodeImage from '../../assets/images/map/monster.png';
import { useLocation, useNavigate } from "react-router-dom";


const Map = ({ onNodeClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCharacter = location.state?.selectedCharacter;
  const [clearedNodes, setClearedNodes] = useState([1, 2, 3]);

  const handleNodeClick = (node) => {
    if (clearedNodes.includes(node)) {
      const nextNodes = getNextNodes(node);
      setClearedNodes((prevClearedNodes) => [...prevClearedNodes, ...nextNodes]);

      // Check if the node has a monster
      if (node >= 4 && node <= 15) {
        navigate("/battle-room", { state: { selectedCharacter } });
      }
    }
  };

  const getNextNodes = (currentNode) => {
    switch (currentNode) {
      case 1:
        return [2, 3];
      case 2:
        return [4, 5];
      case 3:
        return [6, 7];
      case 4:
        return [8];
      case 5:
        return [9];
      case 6:
        return [7];
      case 7:
        return [9, 11];
      case 8:
        return [10, 12];
      case 9:
        return [11]
      case 10:
        return [12, 11]
      case 11:
      case 12:
      case 13:
        return [14];
      default:
        return [];
    }
  };

  return (
    <div className="map-container" >
      {[
        { node: 1, className: "start-node", onClick: () => handleNodeClick(1) },
        { node: 2, className: "node-2", onClick: () => handleNodeClick(2) },
        { node: 3, className: "node-3", onClick: () => handleNodeClick(3) },
        { node: 4, className: "node-4", onClick: () => handleNodeClick(4) },
        { node: 5, className: "node-5", onClick: () => handleNodeClick(5) },
        { node: 6, className: "node-6", onClick: () => handleNodeClick(6) },
        { node: 7, className: "node-7", onClick: () => handleNodeClick(7) },
        { node: 8, className: "node-8", onClick: () => handleNodeClick(8) },
        { node: 9, className: "node-9", onClick: () => handleNodeClick(9) },
        { node: 10, className: "node-10", onClick: () => handleNodeClick(10) },
        { node: 11, className: "node-11", onClick: () => handleNodeClick(11) },
        { node: 12, className: "node-12", onClick: () => handleNodeClick(12) },
        { node: 13, className: "node-13", onClick: () => handleNodeClick(13) },
        { node: 14, className: 'final-boss-node', onClick: () => handleNodeClick(14) },
      ].map(({ node, className, onClick }) => (
        <img
          key={node}
          className={`map-node ${className}${clearedNodes.includes(node) ? ' cleared' : ''}`}
          src={nodeImage}
          alt={`Node ${node}`}
          onClick={onClick}
        />
      ))}

    </div>
  );
};

export default Map;
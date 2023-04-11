import React, { useState, useEffect } from 'react';
import '../../styles/game/map.css';
import mapBackground from '../../assets/images/map/map.png';
import nodeImage from '../../assets/images/map/monster.png';

const Map = ({ onNodeClick }) => {

  const [clearedNodes, setClearedNodes] = useState([1, 2, 3]);


  const handleNodeClick = (node) => {
    if (clearedNodes.includes(node)) {
      onNodeClick(node);
      const nextNodes = getNextNodes(node);
      setClearedNodes((prevClearedNodes) => [...prevClearedNodes, ...nextNodes]);
    }
  };

  const getNextNodes = (currentNode) => {
    switch (currentNode) {
      case 1:
        return [4, 5];
      case 2:
        return [6, 7];
      case 3:
        return [8, 9];
      case 4:
      case 5:
        return [10, 11];
      case 6:
      case 7:
        return [12, 13];
      case 8:
      case 9:
        return [14, 15];
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        return [16];
      default:
        return [];
    }
  }

  return (
    <div className="map-container" style={{ backgroundImage: `url(${mapBackground})` }}>
      {[
        { node: 1, className: 'start-node-1', onClick: () => handleNodeClick(1) },
        { node: 4, className: 'node-1-1', onClick: () => handleNodeClick(4) },
        { node: 5, className: 'node-1-2', onClick: () => handleNodeClick(5) },
        { node: 2, className: 'start-node-2', onClick: () => handleNodeClick(2) },
        { node: 6, className: 'node-2-1', onClick: () => handleNodeClick(6) },
        { node: 7, className: 'node-2-2', onClick: () => handleNodeClick(7) },
        { node: 3, className: 'start-node-3', onClick: () => handleNodeClick(3) },
        { node: 8, className: 'node-3-1', onClick: () => handleNodeClick(8) },
        { node: 9, className: 'node-3-2', onClick: () => handleNodeClick(9) },
        { node: 10, className: 'node-1-3', onClick: () => handleNodeClick(10) },
        { node: 11, className: 'node-1-4', onClick: () => handleNodeClick(11) },
        { node: 12, className: 'node-2-3', onClick: () => handleNodeClick(12) },
        { node: 13, className: 'node-2-4', onClick: () => handleNodeClick(13) },
        { node: 14, className: 'node-3-3', onClick: () => handleNodeClick(14) },
        { node: 15, className: 'node-3-4', onClick: () => handleNodeClick(15) },
        { node: 16, className: 'final-boss-node', onClick: () => handleNodeClick(16) },
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

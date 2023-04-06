import React from 'react';
import '../../styles/game/map.css';
import mapBackground from '../../assets/images/map/map.png';
import nodeImage from '../../assets/images/map/monster.png';
import nodeImage1 from '../../assets/images/map/chest.png';

const Map = ({ onNodeClick }) => {
  return (
    <div className="map-container" style={{ backgroundImage: `url(${mapBackground})` }}>
      <img
        className="map-node start-node-1"
        src={nodeImage}
        alt="Node 1"
        onClick={() => onNodeClick(1)}
      />
      <img
        className="map-node start-node-2"
        src={nodeImage1}
        alt="Node 2"
        onClick={() => onNodeClick(2)}
      />
      <img
        className="map-node start-node-3"
        src={nodeImage}
        alt="Node 3"
        onClick={() => onNodeClick(3)}
      />
    </div>
  );
};

export default Map;


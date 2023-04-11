import React from "react";
import MapGen from "./mapGen";
import '../../styles/game/map.css';

const Map = () => {
  return (
    <div className="canvas-container">
      <MapGen />
    </div>
  );
};

export default Map;

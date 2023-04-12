import React from "react";
import MapGen from "./mapGen";
import "../../styles/game/map.css";
import { useLocation } from "react-router-dom";

const Map = () => {
  const location = useLocation();
  const selectedCharacter = location.state?.selectedCharacter;

  return (
    <div className="canvas-container">
      <MapGen selectedCharacter={selectedCharacter} />
    </div>
  );
};

export default Map;

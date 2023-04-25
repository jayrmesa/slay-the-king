import React from "react";
import { useLocation } from "react-router-dom";

const Deck = () => {
  const location = useLocation();

  const { selectedCharacter } = location.state || {};

  return (
    <div className="card-deck">
    {selectedCharacter.startingDeck.map((card) => (
      <img
        key={card.id}
        className="card"
        src={card.image}
        alt={`Card ${card.id}`}
      />
    ))}
  </div>
  )
}

export default Deck;
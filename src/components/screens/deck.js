import React from "react";

import menuBackground from '../../assets/images/menu/menu-background.png';
import CharacterSelection from "./CharacterSelection";

const Deck = () => {

  // const { CharacterSelection } = useSelectedCharacter();
  
console.log(CharacterSelection)

  return (
    <>
    <div className="menu" style={{ backgroundImage: `url(${menuBackground})` }}></div>
    <div className="card-deck">
      {CharacterSelection && CharacterSelection.selectedCharacter.startingDeck.map((card) => (
        <img
          key={card.id}
          className="card"
          src={card.image}
          alt={`Card ${card.id}`}
        />
      ))}
    </div>
  </>
  )
}


export default Deck;
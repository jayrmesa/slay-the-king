import React from "react";
// import { useLocation } from "react-router-dom";
import { cardDecks } from '../common/cardDecks';

const ImgDeck = (props) => {

  const { deck = [] } = props;

  return (
    <>
      {
        deck.map(card => (
          <img
            key={card.id}
            className="card"
            src={card.image}
            alt={`Card ${card.id}`}
          />
        ))
      }
    </>
  )
}

const Deck = () => {

  const cardDeckValues = Object.values(cardDecks);

  return (
    <div className="card-deck">
      {
        cardDeckValues.map(deck => (<ImgDeck deck={deck}/>))
      }
    </div>
  )
}

export default Deck;
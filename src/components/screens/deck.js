import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImgDeck = (props) => {

  const { card = [] } = props;
  console.log(card)
  return (
    <>
      {
          <img
            key={card.id}
            className="card"
            src={card.image}
            alt={`Card ${card.id}`}
          />
      }
    </>
  )
}

const Deck = () => {

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    axios.get('/deck')

      .then((response) => {
        console.log("response:", response.data);
        setDeck(response.data);
        console.log("decks:", deck)
      })
      .catch((error) => console.error('Error fetching deck:', error));
  }, []);



  return(
    <div className="card-deck">
      {
        deck.map(card => (<ImgDeck card={card}/>))
      }
    </div>
  )

}

export default Deck;


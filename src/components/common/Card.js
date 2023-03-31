import React from 'react';
import '../../styles/common/Card.css';
import attackImage from '../../assets/images/cards/attack_1.png';
import shieldImage from '../../assets/images/cards/shield_1.png';
import specialImage from '../../assets/images/cards/special_1.png';

const Card = ({ type }) => {
  const cardImages = {
    attack: attackImage,
    shield: shieldImage,
    special: specialImage,
  };

  return (
    <div className="card">
      <img src={cardImages[type]} alt={`${type} card`} />
    </div>
  );
};



export default Card;

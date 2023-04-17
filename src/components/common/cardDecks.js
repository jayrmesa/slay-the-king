// Yellow Knight Cards
import yellowAttack1 from "../../assets/images/cards/yellowknight/attack1.png";
import yellowShield1 from "../../assets/images/cards/yellowknight/shield1.png";
import yellowSpecial1 from "../../assets/images/cards/yellowknight/special1.png";

// Green Archer Cards
import greenAttack1 from "../../assets/images/cards/greenarcher/attack1.png";
import greenShield1 from "../../assets/images/cards/greenarcher/shield1.png";
import greenSpecial1 from "../../assets/images/cards/greenarcher/special1.png";

// Red Mage Cards
import redAttack1 from "../../assets/images/cards/redmage/attack1.png";
import redShield1 from "../../assets/images/cards/redmage/shield1.png";
import redSpecial1 from "../../assets/images/cards/redmage/special1.png";

//rewards
import reward1 from "../../assets/images/cards/rewards/reward1.png";
import reward2 from "../../assets/images/cards/rewards/reward2.png";
import reward3 from "../../assets/images/cards/rewards/reward3.png";

const cardDecks = {
  character1: [
    { id: 1, 
      image: yellowAttack1, 
      attack: 5, 
      type: 'attack' 
    },
    { id: 2, 
      image: yellowSpecial1, 
      attack: 7, 
      type: 'special' 
    },
    { id: 3, 
      image: yellowShield1, 
      attack: 0, 
      type: 'defend', 
      defense: 5 
    },
    // ... Add more cards up to 10 for character 1
  ],
  character2: [
    { id: 11, 
      image: greenAttack1, 
      attack: 6, 
      type: 'attack' 
    },
    { id: 12, 
      image: greenSpecial1, 
      attack: 12, 
      type: 'special' 
    },
    { id: 13, 
      image: greenShield1, 
      attack: 0, 
      type: 'defend', 
      defense: 4 },
    // ... Add more cards up to 10 for character 2
  ],
  character3: [
    { id: 21, 
      image: redAttack1, 
      attack: 7, 
      type: 'attack' 
    },
    { id: 22, 
      image: redSpecial1, 
      attack: 14, 
      type: 'special' 
    },
    { id: 23, 
      image: redShield1, 
      attack: 0, 
      type: 'defend', 
      defense: 3 
    },
    // ... Add more cards up to 10 for character 3
  ],
};

const rewardCards = [
  // Add the new card objects here
  { id: 31, image: reward1, attack: 8, type: 'attack' },
  { id: 32, image: reward2, attack: 0, type: 'heal', heal: 5 },
  { id: 33, image: reward3, attack: 8, type: 'defend', defense: 8 },
  // ...
];

export { cardDecks, rewardCards };

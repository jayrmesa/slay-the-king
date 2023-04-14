import React from "react";
import '../../styles/screens/_navbar.css';
import healthBar from '../../assets/images/ui/healthBar.png';
import settings from '../../assets/images/ui/settings.png';
import deck from '../../assets/images/ui/deck.png';

const Navbar = () => {
  return (<nav>
            <ul className="navlist">
              <li className="navlist-item"><img
                src={healthBar}
                alt={"Health Bar"}
                style={{ width: '170px', height: 'auto', margin: '5px' }}
              /></li>
              <li className="navlist-item"><img
                src={deck}
                alt={"Deck"}
                style={{ width: '40px', height: 'auto', margin: '5px' }}
              /></li>
              <li className="navlist-item"><img
                src={settings}
                alt={"Settings"}
                style={{ width: '40px', height: 'auto', margin: '5px' }}
              /></li>
            </ul>
          </nav>)
}

export default Navbar;
  
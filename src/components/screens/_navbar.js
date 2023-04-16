import React from "react";
import '../../styles/screens/_navbar.css';
import map from '../../assets/images/ui/map.png';
import settings from '../../assets/images/ui/settings.png';
import deck from '../../assets/images/ui/deck.png';

const Navbar = () => {
  return (<nav>
            <ul className="navlist">
              <li className="navlist-item">
              <a href="/map">
                <img
                src={map}
                alt={"Map"}
                style={{ width: '40px', height: '40px', margin: '5px' }}
                />
              </a>
              </li>
              <li className="navlist-item">
              <a href="/deck">
                <img
                src={deck}
                alt={"Deck"}
                style={{ width: '40px', height: '40px', margin: '5px' }}
                />
              </a>
              </li>
              <li className="navlist-item">
              <a href="/options">
                <img
                src={settings}
                alt={"Settings"}
                style={{ width: '40px', height: '40px', margin: '5px' }}
                />
              </a>
              </li>
            </ul>
          </nav>)
}

export default Navbar;
  
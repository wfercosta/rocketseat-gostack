import React from "react";
import "./style.css";

import facebook from '../../assets/facebook.png';

function Header() {
  return (
    <header>
      <a href="#" class="header-logo">
        <img src={facebook} />
      </a>
      <div className="header-right">
        <nav>
          <a href="#">Meu perifl</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

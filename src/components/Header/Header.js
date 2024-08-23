import React from "react";
import "../Header/Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      📽️ CINEMA 🎞️
    </span>
  );
};

export default Header;

import React from "react";
import "./Header.scss";

function Header(props) {
  return (
    <div className="header">
      <div className="header-left">
        <span>Booking Movies</span>
      </div>
      <span className="header-right">{props.name}</span>
    </div>
  );
}

export default Header;

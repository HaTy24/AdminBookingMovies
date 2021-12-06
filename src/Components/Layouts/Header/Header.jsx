import React from "react";
import "./Header.scss";

function Header(props) {
  return (
    <div className="header">
      <div className="header-left">
        <img
          src="https://www.soundexp.org/wp-content/uploads/2018/02/icon-tickets.png"
          alt=""
        />
        <span>Booking Movies</span>
      </div>
      <span className="header-right">{props.name}</span>
    </div>
  );
}

export default Header;

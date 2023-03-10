import React from "react";
import logo from "../Asset/logo3.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header">
        <Link to="/">
          <div id="left">
            <div>
              <img id="logo" src={logo} alt="PR" />
            </div>
            <div id="pr">
              <p>Purchase and Repair</p>
            </div>
          </div>
        </Link>

        <div id="right">
          <ul className="nav-links">
            <Link to="/signup">
              <li>Sign Up</li>
            </Link>

            <li>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;

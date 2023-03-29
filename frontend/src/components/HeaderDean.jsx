import React from "react";
import { useState, useEffect } from "react";
import logo from "../Asset/logo3.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function HeaderDean() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://purchase-and-repair.onrender.com/dean/getme", {
        withCredentials: true,
      })
      .then((response) => {
        setName(response.data.name);
      });
  });

  const handleLogout = async (event) => {
    event.preventDefault();
    await axios
      .get("https://purchase-and-repair.onrender.com/dean/logout", {
        withCredentials: true,
      })
      .then((response) => navigate("/login/dean"));
  };

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

        <div className="right">
          <ul className="nav-links">
            <div className="left-li-div">
              <li className="icon-username">
                <div>
                  <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                </div>
                <div>{name}</div>
              </li>
            </div>
            <div>
              <li>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </div>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default HeaderDean;

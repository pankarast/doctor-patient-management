import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";
import {
  MdDashboard,
  MdFormatListBulleted,
  MdSignalCellularAlt,
  MdLogout,
} from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { useAuth } from '../../components/AuthContext'; 

function Container({ children }) {
  const [nav, setNav] = useState(true);
  const { logout } = useAuth();

  const Change = () => {
    setNav((prevNav) => !prevNav);
  };

  return (
    <div>
      <div id="sidebar" className={nav ? "" : "closeNav"}>
        <div id="menu">
          <div className={`menuWrap ${nav ? "" : "small"}`}>
          <NavLink
            exact
            activeClassName="active"
            to="/profile"
            className="menuItemWrap"
          >
            <div className="menuItemAcc" id="philosophy">
              <div className="menuIcon">
              <BiSolidUserCircle />{" "}
              </div>
              <h3> Username </h3>
            </div>
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            to="/sign-in"
            className="menuItemWrap"
            
          >
            <div
              className="menuItemWrap"
              onClick={() => logout()} // Call logout when this element is clicked
              style={{ cursor: 'pointer' }} // Make it look clickable
            >
            <div className="menuItemAcc" id="philosophy">
              <div className="menuIcon">
              <MdLogout />
              </div>
              <h3>Log Out</h3>
            </div>
            </div>
          </NavLink>
            
          </div>
          <div className="burgerContainer">
              <div
                id="burgerArrow"
                className={`cookBurger ${nav ? "clickBurger" : ""} `}
                onClick={Change}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h3 onClick={Change}>Collapse</h3>
            </div>

          <NavLink activeclassname="active" to="/" className="menuItemWrap">
            <div className="menuItemAcc" id="philosophy">
              <div className="menuIcon">
                <MdDashboard />
              </div>
              <h3>Dasboard</h3>
            </div>
          </NavLink>

          <NavLink activeclassname="active" to="/resource-list" className="menuItemWrap">
            <div className="menuItemAcc" id="mission">
              <div className="menuIcon">
                <MdFormatListBulleted />
              </div>
              <h3>Resource List</h3>
            </div>
          </NavLink>

          <NavLink activeclassname="active" to="/grafana-diagram" className="menuItemWrap">
            <div className="menuItemAcc" id="diagram">
              <div className="menuIcon">
                <MdSignalCellularAlt />
              </div>
              <h3>Demand Prediction</h3>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Container;

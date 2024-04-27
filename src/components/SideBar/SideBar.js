import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";
import { MdLogout, MdOutlinePersonSearch } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { useAuth } from '../../components/AuthContext';

function Container({ children }) {
  const [nav, setNav] = useState(true);
  // Extracting logout and userType from the context
  const { logout, userType, userName } = useAuth();

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
                  <BiSolidUserCircle />
                </div>
                <h3> {userName} </h3>
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
                <FaRegCalendarAlt />
              </div>
              <h3>Appointments</h3>
            </div>
          </NavLink>

          {/* Conditional rendering based on userType */}
          {userType === "patient" && (
            <NavLink activeclassname="active" to="/doctor-list" className="menuItemWrap">
              <div className="menuItemAcc" id="mission">
                <div className="menuIcon">
                  <MdOutlinePersonSearch />
                </div>
                <h3>Doctor Search</h3>
              </div>
            </NavLink>
          )}

          {/* Further navigation links can be conditionally rendered here */}
        </div>
      </div>
    </div>
  );
}

export default Container;

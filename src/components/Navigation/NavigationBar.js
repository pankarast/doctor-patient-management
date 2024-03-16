import React from "react";
import "./NavigationBar.scss";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

const NavigationBar = ({title, setThemeState}) => {
  return (
    <div>
      <div id="nav-bar-wrapper">
        <div id="nav-main-part">
          <Link to="/">
            <img
              src="/favicon.ico"
              alt="Sunrise Logo"
              class="logo mobile-only"
              width="40"
            />
            <img
              src="/SUNRISE-Logo.png"
              alt="Sunrise Logo"
              class="logo desktop-only"
              width="200"
            />
          </Link>
          <div id="navTitle">
            <h2>{title}</h2>
          </div>
        </div>
        <div id="secondary-menu">
          <ThemeSwitch
            sx={{ m: 0 }}
            onChange={(e) => {
              if (e.target.checked) {
                setThemeState(true);
              } else {
                setThemeState(false);
              }
            }}
            id="themeSwitch"
            defaultChecked
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

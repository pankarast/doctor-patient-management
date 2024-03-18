import "./App.scss";
import React, { useState, useEffect } from "react";
import {BrowserRouter} from "react-router-dom";

import SideBar from "./components/SideBar/SideBar"
import NavigationBar from "./components/Navigation/NavigationBar";
import AppRoutes from "./components/Routes/AppRoutes";
import { useAuth } from './components/AuthContext'; 

function App() {
  const [navBarTitle, setNavBarTitle] = useState("");
  const [themeState, setThemeState] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Whenever isLoggedIn changes and is false, reset the navBarTitle
    if (!isLoggedIn) {
      setNavBarTitle(""); // Reset to default title or any specific title you want when logged out
    }
  }, [isLoggedIn]); // Depend on isLoggedIn to trigger this effect

  return (
    <>
      <BrowserRouter>
        <div id="App" className={`App ${themeState ? 'darkMode' : ''}`}>
          <NavigationBar title={navBarTitle} setThemeState={setThemeState}/>
          <div className="app-main-content">
            {isLoggedIn && <SideBar />} 
            <div className="app-content">
              <AppRoutes setTitle={setNavBarTitle}/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

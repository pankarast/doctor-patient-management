import "./App.scss";
import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";

import SideBar from "./components/SideBar/SideBar"
import NavigationBar from "./components/Navigation/NavigationBar";
import AppRoutes from "./components/Routes/AppRoutes";

function App() {
  const [navBarTitle, setNavBarTitle] = useState("");
  const [themeState, setThemeState] = useState(true);

  return (
  <>
    <BrowserRouter>
      <div id="App" className={`App ${themeState ? 'darkMode' : ''}`}>
        <NavigationBar title={navBarTitle} setThemeState={setThemeState}/>
        <div className="app-main-content">
          <SideBar />
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

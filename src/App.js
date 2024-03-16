import "./App.scss";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorRegistration from './components/DoctorRegistration';
import PatientRegistration from './components/PatientRegistration';
import DoctorSelection from './components/DoctorSelection';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentList from './components/AppointmentList';
import LandingPage from './components/LandingPage';

import SideBar from "./components/SideBar/SideBar"
import NavigationBar from "./components/Navigation/NavigationBar";
import AppRoutes from "./components/Routes/AppRoutes";

function App() {
  const [navBarTitle, setNavBarTitle] = useState("");
  const [themeState, setThemeState] = useState(true);

  return (
  <>
    (
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
    )
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorRegistration from './components/DoctorRegistration';
import PatientRegistration from './components/PatientRegistration';
import DoctorSelection from './components/DoctorSelection';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentList from './components/AppointmentList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-doctor" element={<DoctorRegistration />} />
        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/select-doctor" element={<DoctorSelection />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;

import {Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "../../components/pages/LandingPage/LandingPage";
import ResourceList from "../../components/pages/ResourceList/ResourceList";

import Profile from "../../components/pages/Profile/Profile";

import SignIn from "../../components/pages/SignIn/SignIn";

import DoctorRegistration from "../../components/DoctorRegistration";
import PatientRegistration from "../../components/PatientRegistration";
import DoctorSelection from "../../components/DoctorSelection";
import AppointmentBooking from "../../components/AppointmentBooking";
import AppointmentList from "../../components/AppointmentList";
import { useAuth } from '../../components/AuthContext'; 

import React, {useEffect} from "react";



const AppRoutes = ({setTitle}) => {
    const location = useLocation();

    const { isLoggedIn } = useAuth();

    const routesList = [{
        path: "/resource-list", title: "Resource List", element: <ResourceList/>
    }, {
        path: "/profile", title: "Profile", element: <Profile/>
    }, {
        path: "/", title: "LandingPage", element: <LandingPage/>
    },{
        path: "/register-doctor", title: "Doctor Registration", element: <DoctorRegistration/>
    },{
        path: "/register-patient", title: "Patient Registration", element: <PatientRegistration/>
    },{
        path: "/select-doctor", title: "Doctor Selection", element: <DoctorSelection/>
    },{
        path: "/book-appointment", title: "Appointment Booking", element: <AppointmentBooking/>
    },{
        path: "/appointments", title: "Appointments", element: <AppointmentList/>
    },]

    useEffect(() => {
        routesList.find((item)=>{
            if(location.pathname === item.path){
                setTitle(item.title);
            }
        })
    }, [location.pathname])


    
    return (
        isLoggedIn ? (
        <Routes>
        {/* <Route path="/login" element={<SignIn />} /> */}
    {routesList.map((item, index) =>
        <Route path={item.path} element={item.element} key={index}/>
    )}
        {/* <Route path="*" element={<SignIn />} /> */}
    </Routes>

    ): (
        <SignIn />
      )
    
   );
};
export default AppRoutes;
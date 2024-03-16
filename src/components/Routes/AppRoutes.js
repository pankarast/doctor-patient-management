import {Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "../../pages/LandingPage/LandingPage";
import ResourceList from "../../pages/ResourceList/ResourceList";

import Profile from "../../pages/Profile/Profile";
import React, {useEffect} from "react";

const AppRoutes = ({setTitle}) => {
    const location = useLocation();

    const routesList = [{
        path: "/resource-list", title: "Resource List", element: <ResourceList/>
    }, {
        path: "/profile", title: "Profile", element: <Profile/>
    }, {
        path: "/dashboard", title: "Dashboard", element: <LandingPage/>
    }, {
        path: "/", title: "Dashboard", element: <LandingPage/>
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

    return (<Routes>
            {/* <Route path="/login" element={<SignIn />} /> */}
        {routesList.map((item, index) =>
            <Route path={item.path} element={item.element} key={index}/>
        )}
            {/* <Route path="*" element={<SignIn />} /> */}
        </Routes>)
}
export default AppRoutes;
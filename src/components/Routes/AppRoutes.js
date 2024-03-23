import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "../../components/pages/LandingPage/LandingPage";
import ResourceList from "../../components/pages/ResourceList/ResourceList";
import Profile from "../../components/pages/Profile/Profile";
import SignIn from "../../components/pages/SignIn/SignIn";
import SignUp from "../../components/pages/SignUp/SignUp";
import DoctorRegistration from "../../components/DoctorRegistration";
import PatientRegistration from "../../components/PatientRegistration";
import DoctorSelection from "../../components/DoctorSelection";
import AppointmentBooking from "../../components/AppointmentBooking";
import AppointmentList from "../../components/AppointmentList";
import { useAuth } from '../../components/AuthContext'; 

const AppRoutes = ({ setTitle }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    const routesList = [
        { path: "/resource-list", title: "Resource List", element: <ResourceList/> },
        { path: "/profile", title: "Profile", element: <Profile/> },
        { path: "/", title: "LandingPage", element: <LandingPage/> },
        { path: "/register-doctor", title: "Doctor Registration", element: <DoctorRegistration/> },
        { path: "/register-patient", title: "Patient Registration", element: <PatientRegistration/> },
        { path: "/select-doctor", title: "Doctor Selection", element: <DoctorSelection/> },
        { path: "/book-appointment", title: "Appointment Booking", element: <AppointmentBooking/> },
        { path: "/appointments", title: "Appointments", element: <AppointmentList/> },
        { path: "/sign-in", title: "Sign In", element: <SignIn /> },
        { path: "/sign-up", title: "Sign Up", element: <SignUp /> },
    ];

    useEffect(() => {
        const route = routesList.find(item => location.pathname === item.path);
        if (route) setTitle(route.title);
    }, [location.pathname, setTitle]);

    return (
        <Routes>
            {isLoggedIn ? (
                routesList.map((item, index) => <Route path={item.path} element={item.element} key={index} />)
            ) : (
                <>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    {/* Optionally, redirect to sign-in by default if the path doesn't match */}
                    <Route path="*" element={<SignIn />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;

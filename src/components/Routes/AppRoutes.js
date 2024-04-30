import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../../components/pages/Profile/Profile";
import SignIn from "../../components/pages/SignIn/SignIn";
import SignUp from "../../components/pages/SignUp/SignUp";
import AppointmentList from "../../components/AppointmentList";
import { useAuth } from "../../components/AuthContext";
import DoctorsList from "../../components/pages/DoctorsList/DoctorsList";
import AppointmentBooking from "../../components/pages/Appointment/AppointmentBooking";

const AppRoutes = ({ setTitle }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const routesList = [
    { path: "/doctor-list", title: "Doctor List", element: <DoctorsList /> },
    { path: "/profile", title: "Profile", element: <Profile /> },
    { path: "/", title: "Appointments", element: <AppointmentList /> },
    { path: "/sign-in", title: "Sign In", element: <SignIn /> },
    { path: "/sign-up", title: "Sign Up", element: <SignUp /> },
    {
      path: "/appointment/:doctorId",
      title: "Appointment Booking",
      element: <AppointmentBooking />,
    },
  ];

  useEffect(() => {
    const route = routesList.find((item) => location.pathname === item.path);
    if (route) setTitle(route.title);
  }, [location.pathname, setTitle]);

  return (
    <Routes>
      {isLoggedIn ? (
        routesList.map((item, index) => (
          <Route path={item.path} element={item.element} key={index} />
        ))
      ) : (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<SignIn />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;

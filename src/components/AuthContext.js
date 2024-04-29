import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(sessionStorage.getItem("userType"));
  const [userName, setUserName] = useState(null);

  const updateUserName = (newUserName) => {
    sessionStorage.setItem("userName", newUserName);
    setUserName(newUserName);
  };

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

const login = async (amka, password, userType) => {
  const endpoint = userType === "doctor" ? "doctors/login" : "patients/login";
  try {
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ socialSecurityNumber: amka, password }),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", data.user.id);
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("userName", data.user.name);
      setIsLoggedIn(true);
      setUserId(data.user.id);
      setUserType(userType);
      setUserName(data.user.name);
      return data; // Resolve the promise with data
     
    } else {
      
      const errorData = await response.json(); // Assuming the server sends a JSON response for errors
      throw new Error(errorData || "Failed to log in");
    }
  } catch (error) {
    throw error; // Re-throw to be caught by calling component
  }
};


  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    sessionStorage.removeItem("userId");
    setUserId(null);
    sessionStorage.removeItem("userType");
    setUserType(null);
    sessionStorage.removeItem("userName");
    setUserName(null);
  };

  const value = {
    isLoggedIn,
    userId,
    userType,
    userName,
    login,
    logout,
    updateUserName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

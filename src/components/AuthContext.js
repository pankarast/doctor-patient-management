import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const login = async (amka, password) => {
    try {
        const response = await fetch('http://localhost:8080/patients/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ socialSecurityNumber: amka, password }),
        });

        if (response.ok) {
            // Assuming login success when response status is 200
            sessionStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
        } else {
            // Handle unsuccessful login attempt (e.g., invalid credentials)
            console.error('Login failed with status:', response.status);
        }
    } catch (error) {
        console.error('Login request failed with error:', error);
    }
};


  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

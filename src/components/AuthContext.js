import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(sessionStorage.getItem('userType'));

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const login = async (amka, password, userType) => {
    const endpoint = userType === 'doctor' ? 'doctors/login' : 'patients/login';
    try {
        const response = await fetch(`http://localhost:8080/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ socialSecurityNumber: amka, password }),
        });
  
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userId', data.user.id);
            sessionStorage.setItem('userType', userType);
            setIsLoggedIn(true);
            setUserId(data.user.id);
            setUserType(userType);
        } else {
            console.error('Login failed with status:', response.status);
        }
    } catch (error) {
        console.error('Login request failed with error:', error);
    }
  };
  



  const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    sessionStorage.removeItem('userId');
    setUserId(null);
    sessionStorage.removeItem('userType');
    setUserType(null);
  };

  const value = {
    isLoggedIn,
    userId,
    userType,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

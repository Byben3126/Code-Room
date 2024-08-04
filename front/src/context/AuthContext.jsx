import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 

  useEffect(()=> {
    let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : false
    if (userData) {
      setUser(userData)
    }
  },[])

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token',userData.access_token)
    localStorage.setItem('userData',JSON.stringify(userData))
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem('token','')
    localStorage.setItem('userData','')
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

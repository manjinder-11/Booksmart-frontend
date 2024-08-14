import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdminUser] = useState(JSON.parse(localStorage.getItem("Admin")));

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Admin");
    setUser(null);
    setAdminUser(null);
    navigate("/login");
  };
  const loginAsAdmin = (userData) => {
    localStorage.setItem("Admin", JSON.stringify(userData));
    setAdminUser(userData);
  };
  return (
    <AuthContext.Provider value={{ user, admin, login, logout, loginAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

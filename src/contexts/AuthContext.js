import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false)

  function login(username, password) {
    let role;
    switch (username) {
      case "admin":
        role = "admin";
        break;
      case "manager":
        role = "manager";
        break;
      case "user":
        role = "user";
        break;

      default:
        role = "user";
        break;
    }
    localStorage.setItem('loggedIn', 'loggedIn')
    setAuthUser({ name: username, role });
  }
  function logout(username, password) {
    setAuthUser(null);
    localStorage.removeItem('loggedIn')
  }

  function getAuthUser() {
    const hasLocalStorage = localStorage.getItem('loggedIn');
    if (hasLocalStorage) {
      setLoading(true);
      setTimeout(() => {
        setAuthUser({ name: 'admin', role: 'admin' });
        setLoading(false)
      }, 2000);
    }

  }

  const value = {
    authUser,
    setAuthUser,
    loading,
    login,
    logout,
    getAuthUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

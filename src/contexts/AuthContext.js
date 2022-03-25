import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

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
    setAuthUser({ name: username, role });
  }
  function logout(username, password) {
    setAuthUser(null);
  }

  const value = {
    authUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

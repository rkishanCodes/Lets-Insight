import React, { createContext, useState, useContext } from "react";
import { fetchProfile, logout as logoutUser } from "../utils/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = (navigate) => {
    logoutUser(navigate);
    setIsLoggedIn(false);
    setProfileInfo(null);
  };

  const fetchUserProfile = async () => {
    const profileData = await fetchProfile();
    if (profileData) {
      setProfileInfo(profileData);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        fetchUserProfile,
        profileInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

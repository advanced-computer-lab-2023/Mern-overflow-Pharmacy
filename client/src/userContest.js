import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null,
  );

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userId, userRole]);

  return (
    <UserContext.Provider value={{ userId, setUserId, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

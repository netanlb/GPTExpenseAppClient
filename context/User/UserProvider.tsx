import React, { useState } from "react";
import UserContext from "./UserContext";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

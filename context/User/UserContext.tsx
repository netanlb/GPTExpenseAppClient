import React from "react";

interface UserContextData {
  isLoggedIn: boolean;
  userId: string | null;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUserId: (userId: string) => void;
}

const UserContext = React.createContext<UserContextData>({
  isLoggedIn: false,
  userId: null,
  setIsLoggedIn: () => {},
  setUserId: () => {},
});

export default UserContext;

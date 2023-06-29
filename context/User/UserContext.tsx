import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextData {
  isLoggedIn: boolean;
  userId: string | null;
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOutUser: () => void;
  setUser: (user: User) => void;
  setUserId: (userId: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const UserContext = React.createContext<UserContextData>({
  isLoggedIn: false,
  userId: null,
  user: null,

  setUserId: () => {},
  setUser: () => {},
  loginUser: async () => {},
  registerUser: async () => {},
  signOutUser: () => {},
  setIsLoggedIn: () => {},
});

export default UserContext;

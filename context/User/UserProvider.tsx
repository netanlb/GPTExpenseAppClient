import React, { useState } from "react";
import UserContext from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const loginUser = async (email: string, password: string): Promise<void> => {
    const url: string = `http://10.100.102.98:5000/auth/`;
    const body: { [key: string]: any } = {
      email,
      password,
    };

    const res: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error: any = await res.json();
      throw new Error(error.message || `HTTP error! status: ${error.status}`);
    }

    const resObj = await res.json();
    await storeUserAndToken({ user: resObj.user, token: resObj.token });

    setUser(resObj.user);
    setUserId(resObj.user.id);
    setIsLoggedIn(true);
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const url: string = `http://10.100.102.98:5000/users/`;
    const body: { [key: string]: any } = {
      name,
      email,
      password,
    };

    const res: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error: any = await res.json();
      throw new Error(error.message || `HTTP error! status: ${error.status}`);
    }

    const resObj = await res.json();
    await storeUserAndToken({ user: resObj.user, token: resObj.token });

    setUser(resObj.user);
    setUserId(resObj.user.id);
    setIsLoggedIn(true);
  };

  const signOutUser = (): void => {
    removeStorageUser();

    setIsLoggedIn(false);
    setUserId(null);
    setUser(null);
  };

  const storeUserAndToken = async (user: any): Promise<void> => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error: any) {
      console.log(error);
    }
  };

  const removeStorageUser = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("@user");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        user,
        setUser,
        setUserId,
        loginUser,
        registerUser,
        signOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

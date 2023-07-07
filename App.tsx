import React, { useContext, useEffect } from "react";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/MainNavigator";
import { UserContext, UserProvider } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEV_SERVER_URL, PROD_SERVER_URL } from "@env";

let serverURL: string;
if (__DEV__) {
  serverURL = DEV_SERVER_URL;
} else {
  serverURL = PROD_SERVER_URL;
}

const AppContent: React.FC = () => {
  const { setIsLoggedIn, isLoggedIn, setUser, setUserId } =
    useContext(UserContext);

  useEffect(() => {
    tryLogin();
  }, []);

  const tryLogin = async () => {
    try {
      const jsonUser = await AsyncStorage.getItem("@user");
      const storageUser = jsonUser !== null ? JSON.parse(jsonUser) : null;
      if (jsonUser && !storageUser) throw new Error("error retrieving user");

      console.log(serverURL);
      const url = new URL(`${serverURL}/auth/user`);

      const res: Response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": storageUser.token,
        },
      });

      if (!res.ok) {
        const error: any = await res.json();
        throw new Error(error.message || `HTTP error! status: ${error.status}`);
      }

      const user = await res.json();

      setUser({ ...user, id: user._id });
      setUserId(user._id);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

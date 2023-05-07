import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/MainNavigator";
import { UserContext, UserProvider } from "./context";

const AppContent: React.FC = () => {
  const { isLoggedIn } = useContext(UserContext);

  return isLoggedIn ? <MainNavigator /> : <AuthNavigator />;
};

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </NavigationContainer>
  );
}

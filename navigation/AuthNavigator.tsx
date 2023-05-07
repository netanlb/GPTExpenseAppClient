import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginScreen from "../components/Login/LoginScreen";
import RegisterScreen from "../components/Register/RegisterScreen";

interface RootStackParamList {
  [key: string]: undefined | object;
  Login: undefined;
  Register: undefined;
}

interface LoginScreenNavigationProps
  extends NativeStackNavigationProp<RootStackParamList, "Login"> {}

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProps;
}

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

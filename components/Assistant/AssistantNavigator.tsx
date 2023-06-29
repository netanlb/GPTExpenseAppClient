import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssistantScreen from "./AssistantScreen";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={AssistantScreen}
        options={{ title: "Assistant" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

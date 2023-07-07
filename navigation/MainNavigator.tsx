import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import ProfileNavigator from "../components/Profile/ProfileNavigator";
import HomeNavigator from "../components/Home/HomeNavigator";
import AssistantNavigation from "../components/Assistant/AssistantNavigator";
import { ExpenseProvider } from "../context";
import StatisticsNavigator from "../components/Statistics/StatisticsNavigator";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <ExpenseProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="Assistant"
          component={AssistantNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbox-outline" size={size} color={color} />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Overview"
          component={StatisticsNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pie-chart-outline" size={size} color={color} />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </ExpenseProvider>
  );
};

const Main = () => {
  return (
    <NavigationContainer>
      <Tabs></Tabs>
    </NavigationContainer>
  );
};

export default Main;

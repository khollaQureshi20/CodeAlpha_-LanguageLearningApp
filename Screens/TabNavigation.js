import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./TabNavScreen/Home/Home";
import Gamefied from "./TabNavScreen/Gamified/Gamefied";
import Profile from "./TabNavScreen/Profile/Profile";

const Tab = createBottomTabNavigator();

export default function TabNavigation({ route }) {
  const { users, selectedLanguage } = route.params || {}; // Get the data passed from Language screen
console.log('tab',selectedLanguage)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }  else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          else if (route.name === "Gamefied") {
            iconName = focused ? "help-circle" : "help-circle-outline"; // Change to quiz-related icon
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} initialParams={{ users, selectedLanguage }} />
       <Tab.Screen name="Gamefied" component={Gamefied} options={{ headerShown: true }} /> 
   
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} initialParams={{ users }} />
    </Tab.Navigator>
  );
}

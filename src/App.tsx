import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import BlogScreen from "./screens/BlogScreen";
import BlogDetailScreen from "./screens/BlogDetailScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Blog" component={BlogScreen} options={{ title: "Blog" }} />
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen} options={{ title: "Detail Artikel" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
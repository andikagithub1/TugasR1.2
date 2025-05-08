// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import BlogScreen from './screens/BlogScreen';
import LoginScreen from './screens/LoginScreen';
import { ThemeProvider } from './contexts/ThemeContexts'; // Sesuaikan path sesuai folder Anda

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BlogDetail" component={BlogDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
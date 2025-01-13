import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen2 from './Screens/SplashScreen2';
import SplashScreen from './Screens/SplashScreen';
import Login from './Screens/Login';
import HomeScreen from './Screens/Home';
import SettingScreen from './Screens/Setting'; // Pastikan file ini ada

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator for Home and Setting
function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

// Main App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

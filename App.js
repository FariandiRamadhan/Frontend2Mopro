import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { checkAuthStatus } from './Utilities/fetch_functions';

import SplashScreen2 from './Screens/SplashScreen2';
import SplashScreen from './Screens/SplashScreen';
import Login from './Screens/Login';
import HomeScreen from './Screens/Home';
import SettingScreen from './Screens/Setting'; // Pastikan file ini ada
import LoadingScreen from './Screens/Loading';

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
  // Mengecek status login jika true maka login screen dimunculkan
  const [isLogin, setisLogin] = useState(true);

  // Mengecek loading jika true maka akan ada loading screen yang muncul
  const [loading, setLoading] = useState(true);

  // Memberikan passing value kepada component SplashScreen untuk menampilkan nama sesuai username login
  const [username, setUsername] = useState("");

  // Melakukan fetch data dan re-render screen karena perubahan state
  useEffect(()=>{
    checkAuthStatus().then(
      response => {
        if(response){
          setisLogin(false);
          setUsername(response.data.username);
        }
        setLoading(false);
        console.log(response, isLogin);
      }
    ).catch(error => console.error);
  }, [setisLogin])

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLogin ? (<Stack.Screen name="Login" component={Login} />):null}
        <Stack.Screen name="SplashScreen" component={SplashScreen} initialParams={{ username }}/>
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

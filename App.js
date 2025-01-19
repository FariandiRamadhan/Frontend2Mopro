import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Home from './Screens/Home';
import Login from './Screens/Login';
import SplashScreen from './Screens/SplashScreen';
import SplashScreen2 from './Screens/SplashScreen2';
import NewAgenda from './Screens/NewAgenda';
import Search from './component/Search';
import MeetingResult from './Screens/MeetingResult';
import ViewAgenda from './Screens/ViewAgenda';
import EditAgenda from './Screens/EditAgenda';
import Notif from './component/Notif';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    
  <View style={styles.drawerContainer}>
    <View style={styles.sidebarHeader}>
      <Text style={styles.sidebarTitle}>Hi Luca's</Text>
      <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✖</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
      <Ionicons name="home-outline" size={24} color="white" />
      <Text style={styles.drawerLabel}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('NewAgenda')}>
      <Ionicons name="add-circle-outline" size={24} color="white" />
      <Text style={styles.drawerLabel}>New Agenda</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Search')}>
      <Ionicons name="search-outline" size={24} color="white" />
      <Text style={styles.drawerLabel}>Search Agenda</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.drawerItem, { marginTop: 420 }]} onPress={() => navigation.navigate('Login')}>
      <Ionicons name="log-out-outline" size={24} color="white" />
      <Text style={styles.drawerLabel}>Logout</Text>
    </TouchableOpacity>
  </View>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#1C1C1E',
          width: 280,
        },
        headerStyle: {
          backgroundColor: '#1C1C1E',
        },
        headerTintColor: '#fff',
        drawerLabelStyle: {
          color: '#fff',
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Welcome Back Luca \'s' }} />
      <Drawer.Screen name="NewAgenda" component={NewAgenda} options={{ title: 'New Agenda' }} />
      <Drawer.Screen name="Search" component={Search} options={{ title: 'Search' }} />
      <Drawer.Screen name="Login" component={Login} options={{ title: 'Logout' }} />
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
        <Stack.Screen name="NewAgenda" component={NewAgenda} />
        <Stack.Screen name="MeetingResult" component={MeetingResult} />
        <Stack.Screen name="ViewAgenda" component={ViewAgenda} />
        <Stack.Screen name="EditAgenda" component={EditAgenda} />
        <Stack.Screen name="Notif" component={Notif} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarTitle: {
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
  },  
  closeButtonText: {
    fontSize: 20,  
    color: 'white',
    marginLeft: 10,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  }
});
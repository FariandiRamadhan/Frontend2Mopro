import React, { useState} from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../Utilities/fetch_functions';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const navigation = useNavigation();

  const handleSignIn = () => {
    console.log("click");
    try {
      loginUser(form.username, form.password).then(
        response => {
          console.log(response);
          if (response.success) {
            navigation.navigate('SplashScreen');
          } else {
            Alert.alert('Error', data.message || 'Login failed');
          }
        }
      );
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.66)' }}>
      <View style={styles.header}>
        <Image
          alt="App Logo"
          style={styles.headerImg}
          source={require('../assets/img/logo-login.png')}
        />
        <Text style={styles.title}>Meeting App</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title2}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={form.username}
          onChangeText={(text) => setForm({ ...form, username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 6,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.71)',
    alignItems: 'center',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    maxHeight: 300,
  },
  title2: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

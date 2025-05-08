// LoginScreen.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path sesuai folder Anda

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'andika' && password === '12345678') {
      navigation.replace('Home', { username });
    } else {
      alert('Username atau password salah');
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#222' : '#f0f0f0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme === 'dark' ? '#fff' : '#333',
    },
    input: {
      width: 250,
      height: 40,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#444' : '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
    },
    button: {
      backgroundColor: theme === 'dark' ? '#00bfff' : 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default LoginScreen;
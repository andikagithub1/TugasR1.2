// LoginScreen.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#ccc'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#ccc'}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Tombol Toggle Mode */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.toggleButtonText}>
          {theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
        </Text>
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
      color: theme === 'dark' ? '#fff' : '#333',
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
    toggleButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: theme === 'dark' ? '#555' : '#ddd',
      borderRadius: 5,
    },
    toggleButtonText: {
      color: theme === 'dark' ? '#fff' : '#333',
      fontWeight: 'bold',
    },
  });

export default LoginScreen;
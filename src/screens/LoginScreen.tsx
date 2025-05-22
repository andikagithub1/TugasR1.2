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
      <View style={styles.card}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme} activeOpacity={0.8}>
          <Text style={styles.toggleButtonText}>
            {theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#181824' : '#e9f0fa',
    },
    card: {
      width: 320,
      backgroundColor: theme === 'dark' ? '#23233a' : '#fff',
      borderRadius: 18,
      padding: 28,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      color: theme === 'dark' ? '#fff' : '#1a237e',
      letterSpacing: 1,
    },
    input: {
      width: 240,
      height: 44,
      borderWidth: 1.5,
      borderColor: theme === 'dark' ? '#444' : '#b0bec5',
      borderRadius: 8,
      marginBottom: 14,
      paddingHorizontal: 14,
      backgroundColor: theme === 'dark' ? '#2d2d44' : '#f7faff',
      color: theme === 'dark' ? '#fff' : '#333',
      fontSize: 16,
    },
    button: {
      backgroundColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      marginTop: 8,
      marginBottom: 10,
      shadowColor: '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 4,
      elevation: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 0.5,
    },
    toggleButton: {
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 18,
      backgroundColor: theme === 'dark' ? '#444' : '#e3e3e3',
      borderRadius: 8,
    },
    toggleButtonText: {
      color: theme === 'dark' ? '#fff' : '#333',
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

export default LoginScreen;
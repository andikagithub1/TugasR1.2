// LoginScreen.tsx
import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Animasi tombol login
  const loginAnim = useRef(new Animated.Value(1)).current;
  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(loginAnim, { toValue: 0.95, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
      Animated.timing(loginAnim, { toValue: 1, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) })
    ]).start(() => {
      if (username === 'andika' && password === '12345678') {
        navigation.replace('Home', { username });
      } else {
        alert('Username atau password salah');
      }
    });
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, username ? styles.inputActive : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#ccc'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={[styles.input, password ? styles.inputActive : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#ccc'}
        />
        <Animated.View style={{ transform: [{ scale: loginAnim }], width: '100%' }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
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
      shadowColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.13,
      shadowRadius: 18,
      elevation: 10,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme === 'dark' ? '#23233a' : '#e3e3e3',
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
      borderWidth: 1.2,
      borderColor: theme === 'dark' ? '#444' : '#b0bec5',
      borderRadius: 10,
      marginBottom: 14,
      paddingHorizontal: 14,
      backgroundColor: theme === 'dark' ? '#23233a' : '#f7faff',
      color: theme === 'dark' ? '#fff' : '#333',
      fontSize: 16,
      shadowColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 1,
    },
    inputActive: {
      borderColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      backgroundColor: theme === 'dark' ? '#181824' : '#e3f0fa',
    },
    button: {
      backgroundColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 10,
      shadowColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
      elevation: 3,
      alignItems: 'center',
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
      backgroundColor: theme === 'dark' ? '#23233a' : '#e3e3e3',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      alignItems: 'center',
    },
    toggleButtonText: {
      color: theme === 'dark' ? '#fff' : '#333',
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

export default LoginScreen;
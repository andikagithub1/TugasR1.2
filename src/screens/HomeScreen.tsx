// HomeScreen.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const HomeScreen = ({ route, navigation }: any) => {
  const { username } = route.params;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Login Berhasil! Selamat datang, {username}!</Text>

      {/* Tombol Untuk Mengganti Mode */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          {theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>

      {/* Tombol Menuju Blog */}
      <TouchableOpacity style={styles.blogButton} onPress={() => navigation.navigate("Blog")}>
        <Text style={styles.buttonText}>Lihat Blog</Text>
      </TouchableOpacity>

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace("Login")}>
        <Text style={styles.buttonText}>Logout</Text>
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
    welcomeText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: theme === 'dark' ? '#fff' : '#333',
    },
    toggleButton: {
      backgroundColor: theme === 'dark' ? '#555' : '#ddd',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    blogButton: {
      backgroundColor: theme === 'dark' ? '#00ff00' : 'green',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    logoutButton: {
      backgroundColor: theme === 'dark' ? '#ff0000' : 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default HomeScreen;
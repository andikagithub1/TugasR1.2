// HomeScreen.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const HomeScreen = ({ route, navigation }: any) => {
  const { username } = route.params;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image source={require('../assets/images/profile.png')} style={styles.avatar} />
        </View>
        <Text style={styles.welcomeText}>Login Berhasil! Selamat datang,</Text>
        <Text style={styles.username}>{username}!</Text>
      </View>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme} activeOpacity={0.8}>
        <Text style={styles.buttonText}>
          {theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blogButton} onPress={() => navigation.navigate("Blog") } activeOpacity={0.8}>
        <Text style={styles.buttonText}>Lihat Blog</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace("Login") } activeOpacity={0.8}>
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
      backgroundColor: theme === 'dark' ? '#181824' : '#e9f0fa',
    },
    profileCard: {
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#23233a' : '#fff',
      borderRadius: 18,
      padding: 28,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
      width: 320,
    },
    avatarWrapper: {
      backgroundColor: theme === 'dark' ? '#181824' : '#e3e3e3',
      borderRadius: 50,
      padding: 6,
      marginBottom: 10,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#00bfff' : '#1976d2',
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      color: theme === 'dark' ? '#fff' : '#333',
      marginBottom: 2,
    },
    username: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#00bfff' : '#1976d2',
      marginBottom: 2,
    },
    toggleButton: {
      backgroundColor: theme === 'dark' ? '#444' : '#e3e3e3',
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 8,
    },
    blogButton: {
      backgroundColor: theme === 'dark' ? '#00ff99' : '#43a047',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 8,
      shadowColor: '#43a047',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 4,
      elevation: 2,
    },
    logoutButton: {
      backgroundColor: theme === 'dark' ? '#ff5252' : '#e53935',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      marginTop: 10,
      shadowColor: '#e53935',
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
      textAlign: 'center',
    },
  });

export default HomeScreen;
// HomeScreen.tsx
import React, { useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const HomeScreen = ({ route, navigation }: any) => {
  const { username } = route.params;
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Animasi tombol
  const scaleBlog = useRef(new Animated.Value(1)).current;
  const scaleLogout = useRef(new Animated.Value(1)).current;
  const scaleToggle = useRef(new Animated.Value(1)).current;
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

      <Animated.View style={{ transform: [{ scale: scaleToggle }], width: '100%' }}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => {
            Animated.sequence([
              Animated.timing(scaleToggle, { toValue: 0.95, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
              Animated.timing(scaleToggle, { toValue: 1, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) })
            ]).start(toggleTheme);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleBlog }], width: '100%' }}>
        <TouchableOpacity
          style={styles.blogButton}
          onPress={() => {
            Animated.sequence([
              Animated.timing(scaleBlog, { toValue: 0.95, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
              Animated.timing(scaleBlog, { toValue: 1, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) })
            ]).start(() => navigation.navigate("Blog"));
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Lihat Blog</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleLogout }], width: '100%' }}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Animated.sequence([
              Animated.timing(scaleLogout, { toValue: 0.95, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
              Animated.timing(scaleLogout, { toValue: 1, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) })
            ]).start(() => navigation.replace("Login"));
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
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
      borderRadius: 22,
      padding: 32,
      marginBottom: 30,
      shadowColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.13,
      shadowRadius: 20,
      elevation: 12,
      width: 320,
      borderWidth: 1.5,
      borderColor: theme === 'dark' ? '#23233a' : '#e3e3e3',
    },
    avatarWrapper: {
      backgroundColor: theme === 'dark' ? '#181824' : '#e3e3e3',
      borderRadius: 50,
      padding: 8,
      marginBottom: 14,
      shadowColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
      elevation: 4,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      borderWidth: 2.5,
      borderColor: theme === 'dark' ? '#00bfff' : '#1976d2',
    },
    welcomeText: {
      fontSize: 17,
      fontWeight: '600',
      textAlign: 'center',
      color: theme === 'dark' ? '#fff' : '#333',
      marginBottom: 2,
      letterSpacing: 0.2,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#00bfff' : '#1976d2',
      marginBottom: 2,
      letterSpacing: 0.5,
    },
    toggleButton: {
      backgroundColor: theme === 'dark' ? '#23233a' : '#e3e3e3',
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      alignItems: 'center',
    },
    blogButton: {
      backgroundColor: theme === 'dark' ? '#00ff99' : '#43a047',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 8,
      shadowColor: '#43a047',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
      elevation: 3,
      alignItems: 'center',
    },
    logoutButton: {
      backgroundColor: theme === 'dark' ? '#ff5252' : '#e53935',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      marginTop: 10,
      shadowColor: '#e53935',
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
      textAlign: 'center',
    },
  });

export default HomeScreen;
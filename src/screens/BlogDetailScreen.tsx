// BlogDetailScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const BlogDetailScreen = ({ route }: any) => {
  const { blog } = route.params;
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={blog.image} style={styles.blogImage} />
        <Text style={styles.blogTitle}>{blog.title}</Text>
        <Text style={styles.blogDescription}>{blog.description}</Text>
      </View>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#181824' : '#e9f0fa',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: theme === 'dark' ? '#23233a' : '#fff',
      borderRadius: 18,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
    },
    blogImage: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      marginBottom: 18,
    },
    blogTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'dark' ? '#00bfff' : '#1976d2',
      letterSpacing: 0.5,
      textAlign: 'center',
    },
    blogDescription: {
      fontSize: 17,
      color: theme === 'dark' ? '#cfd8dc' : '#333',
      textAlign: 'center',
    },
  });

export default BlogDetailScreen;
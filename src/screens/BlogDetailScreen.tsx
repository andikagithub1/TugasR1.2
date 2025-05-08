// BlogDetailScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path sesuai folder Anda

const BlogDetailScreen = ({ route }: any) => {
  const { blog } = route.params;
  const { theme } = useContext(ThemeContext);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={blog.image} style={styles.blogImage} />
      <Text style={styles.blogTitle}>{blog.title}</Text>
      <Text style={styles.blogDescription}>{blog.description}</Text>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#222' : '#f0f0f0',
    },
    blogImage: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    blogTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'dark' ? '#fff' : '#333',
    },
    blogDescription: {
      fontSize: 16,
      color: theme === 'dark' ? '#ddd' : '#333',
    },
  });

export default BlogDetailScreen;
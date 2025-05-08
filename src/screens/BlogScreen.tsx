// BlogScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path sesuai folder Anda

const BlogScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);
  const blogs = [
    {
      id: 1,
      title: "Artikel Pertama",
      description: "Ini adalah deskripsi untuk artikel pertama.",
      image: require("../assets/images/blog1.jpg"),
    },
    {
      id: 2,
      title: "Artikel Kedua",
      description: "Ini adalah deskripsi untuk artikel kedua.",
      image: require("../assets/images/blog2.jpg"),
    },
  ];

  const styles = getStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Halaman Blog</Text>
      {blogs.map((blog) => (
        <TouchableOpacity
          key={blog.id}
          onPress={() => navigation.navigate("BlogDetail", { blog })}
          style={styles.blogCard}
        >
          <Image source={blog.image} style={styles.blogImage} />
          <Text style={styles.blogTitle}>{blog.title}</Text>
          <Text style={styles.blogDescription}>{blog.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#222' : '#f0f0f0',
      padding: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
      color: theme === 'dark' ? '#fff' : '#333',
    },
    blogCard: {
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      borderRadius: 10,
      marginBottom: 15,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    blogImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    blogTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme === 'dark' ? '#fff' : '#333',
    },
    blogDescription: {
      fontSize: 14,
      color: theme === 'dark' ? '#ddd' : '#666',
    },
  });

export default BlogScreen;
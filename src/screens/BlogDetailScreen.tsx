import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BlogDetailScreen = ({ route }: any) => {
  const { blog } = route.params;

  return (
    <View style={styles.container}>
      <Image source={blog.image} style={styles.blogImage} />
      <Text style={styles.blogTitle}>{blog.title}</Text>
      <Text style={styles.blogDescription}>{blog.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  blogImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  blogDescription: {
    fontSize: 16,
    color: "#333",
  },
});

export default BlogDetailScreen;
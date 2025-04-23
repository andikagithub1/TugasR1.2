import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ route, navigation }: any) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/profile.png")} style={styles.profileImage} />
      <Text style={styles.welcomeText}>Login Berhasil! Selamat datang, {username}!</Text>
      <Text style={styles.description}>Terima kasih telah menggunakan aplikasi kami.</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  blogButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
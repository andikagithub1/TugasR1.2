// BlogScreen.tsx
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path


const BlogScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);
  type BlogType = {
    id: number;
    title: string;
    description: string;
    image: any;
    imageUri?: string | null;
  };
  const defaultBlogs: BlogType[] = [
    {
      id: 1,
      title: "Artikel Pertama",
      description: "Ini adalah deskripsi untuk artikel pertama.",
      image: require("../assets/images/blog1.jpg"),
      imageUri: null,
    },
    {
      id: 2,
      title: "Artikel Kedua",
      description: "Ini adalah deskripsi untuk artikel kedua.",
      image: require("../assets/images/blog2.jpg"),
      imageUri: null,
    },
  ];
  const [blogs, setBlogs] = useState<BlogType[]>(defaultBlogs);
  // Load blogs from AsyncStorage on mount
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const json = await AsyncStorage.getItem('blogs');
        if (json) {
          // Parse and remap image (karena require tidak bisa disimpan di storage)
          const arr = JSON.parse(json);
          setBlogs(arr.map((b: any) => ({
            ...b,
            image: defaultImages[b.imageIdx ?? 0],
          })));
        }
      } catch (e) {
        console.error('Gagal load blogs dari storage:', e);
      }
    };
    loadBlogs();
  }, []);

  // Save blogs to AsyncStorage setiap kali blogs berubah
  useEffect(() => {
    const saveBlogs = async () => {
      try {
        // Simpan index gambar, bukan require
        const blogsToSave = blogs.map(b => {
          const imageIdx = defaultImages.findIndex(img => img === b.image);
          return { ...b, image: undefined, imageIdx };
        });
        await AsyncStorage.setItem('blogs', JSON.stringify(blogsToSave));
      } catch (e) {
        console.error('Gagal simpan blogs ke storage:', e);
      }
    };
    saveBlogs();
  }, [blogs]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  // Ganti dengan index gambar default
  const defaultImages = [
    require("../assets/images/blog1.jpg"),
    require("../assets/images/blog2.jpg"),
    require("../assets/images/blog3.jpg"),
    require("../assets/images/blog4.jpg"),
  ];
  const [newImageIdx, setNewImageIdx] = useState<number>(0);
  const [animValue] = useState(new Animated.Value(1));
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImageIdx, setEditImageIdx] = useState<number>(0);

  const styles = getStyles(theme);

  // ImagePicker dihapus, fungsi pickImage tidak digunakan lagi

  const handleAddBlog = () => {
    if (newTitle.trim() && newDesc.trim()) {
      setBlogs(prev => [
        {
          id: Date.now(),
          title: newTitle,
          description: newDesc,
          image: defaultImages[newImageIdx],
          imageUri: null,
        },
        ...prev,
      ]);
      setNewTitle("");
      setNewDesc("");
      setNewImageIdx(0);
      Animated.sequence([
        Animated.timing(animValue, { toValue: 1.1, duration: 120, useNativeDriver: true }),
        Animated.timing(animValue, { toValue: 1, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleDeleteBlog = (id: number) => {
    Alert.alert('Hapus Blog', 'Yakin ingin menghapus blog ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => setBlogs(blogs.filter(b => b.id !== id)) },
    ]);
  };

  const handleEditBlog = (blog: any) => {
    setEditId(blog.id);
    setEditTitle(blog.title);
    setEditDesc(blog.description);
    // Cari index gambar default yang cocok, jika tidak ada pakai 0
    const idx = defaultImages.findIndex(img => img === blog.image);
    setEditImageIdx(idx >= 0 ? idx : 0);
  };

  const handleSaveEdit = () => {
    setBlogs(prev => prev.map(b => b.id === editId ? {
      ...b,
      title: editTitle,
      description: editDesc,
      image: defaultImages[editImageIdx],
      imageUri: null,
    } : b));
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
    setEditImageIdx(0);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
    // setEditImage(null); // Sudah tidak digunakan
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>{'<'} Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Halaman Blog</Text>
      </View>

      <View style={styles.addBlogCard}>
        <Text style={styles.addBlogTitle}>Tulis Blog Baru</Text>
        <TextInput
          style={styles.input}
          placeholder="Judul Blog"
          value={newTitle}
          onChangeText={setNewTitle}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
        />
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Deskripsi Blog"
          value={newDesc}
          onChangeText={setNewDesc}
          multiline
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {defaultImages.map((img, idx) => (
            <TouchableOpacity
              key={idx}
              style={{ marginRight: 8, borderWidth: newImageIdx === idx ? 2 : 0, borderColor: '#1976d2', borderRadius: 8 }}
              onPress={() => setNewImageIdx(idx)}
              activeOpacity={0.8}
            >
              <Image source={img} style={{ width: 40, height: 40, borderRadius: 8 }} />
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View style={{ transform: [{ scale: animValue }] }}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBlog} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>Tambah Blog</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {blogs.map((blog, idx) => (
          <React.Fragment key={blog.id}>
            {editId === blog.id ? (
              <View style={styles.blogCard}>
                <TextInput
                  style={styles.input}
                  value={editTitle}
                  onChangeText={setEditTitle}
                  placeholder="Judul Blog"
                  placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
                />
                <TextInput
                  style={[styles.input, { height: 60 }]}
                  value={editDesc}
                  onChangeText={setEditDesc}
                  placeholder="Deskripsi Blog"
                  multiline
                  placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  {defaultImages.map((img, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{ marginRight: 8, borderWidth: editImageIdx === idx ? 2 : 0, borderColor: '#1976d2', borderRadius: 8 }}
                      onPress={() => setEditImageIdx(idx)}
                      activeOpacity={0.8}
                    >
                      <Image source={img} style={{ width: 40, height: 40, borderRadius: 8 }} />
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit} activeOpacity={0.8}>
                    <Text style={styles.saveButtonText}>Simpan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit} activeOpacity={0.8}>
                    <Text style={styles.cancelButtonText}>Batal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("BlogDetail", { blog })}
                activeOpacity={0.85}
              >
                <Animated.View style={styles.blogCard}>
                  <Image source={blog.image} style={styles.blogImage} />
                  <Text style={styles.blogTitle}>{blog.title}</Text>
                  <Text style={styles.blogDescription}>{blog.description}</Text>
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.editButton} onPress={() => handleEditBlog(blog)} activeOpacity={0.8}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBlog(blog.id)} activeOpacity={0.8}>
                      <Text style={styles.deleteButtonText}>Hapus</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            )}
            {idx !== blogs.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#181824' : '#e9f0fa',
      padding: 10,
      paddingTop: 0,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      marginBottom: 8,
    },
    backButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme === 'dark' ? '#23233a' : '#e3e3e3',
      borderRadius: 8,
      marginRight: 8,
    },
    backButtonText: {
      color: theme === 'dark' ? '#00bfff' : '#1976d2',
      fontWeight: 'bold',
      fontSize: 15,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme === 'dark' ? '#00bfff' : '#1976d2',
      letterSpacing: 1,
      flex: 1,
    },
    addBlogCard: {
      backgroundColor: theme === 'dark' ? '#23233a' : '#fff',
      borderRadius: 14,
      padding: 16,
      marginBottom: 18,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 2,
    },
    addBlogTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#1976d2',
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme === 'dark' ? '#2d2d44' : '#f7faff',
      color: theme === 'dark' ? '#fff' : '#333',
      borderRadius: 8,
      borderWidth: 1.2,
      borderColor: theme === 'dark' ? '#444' : '#b0bec5',
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 10,
      fontSize: 15,
    },
    addButton: {
      backgroundColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 2,
      marginBottom: 2,
      shadowColor: '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 4,
      elevation: 2,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
      letterSpacing: 0.5,
    },
    blogCard: {
      backgroundColor: theme === 'dark' ? '#23233a' : '#fff',
      borderRadius: 16,
      marginBottom: 0,
      padding: 18,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.13,
      shadowRadius: 8,
      elevation: 4,
      marginHorizontal: 2,
      marginTop: 8,
      transform: [{ scale: 1 }],
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      // gap: 8, // gap is not supported in React Native, use marginRight
    },
    editButton: {
      backgroundColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 6,
      marginRight: 8,
    },
    editButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    deleteButton: {
      backgroundColor: theme === 'dark' ? '#ff5252' : '#e53935',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    saveButton: {
      backgroundColor: theme === 'dark' ? '#00bfff' : '#1976d2',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 6,
      marginRight: 8,
    },
    saveButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    cancelButton: {
      backgroundColor: theme === 'dark' ? '#888' : '#bdbdbd',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    cancelButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    imagePickerButton: {
      backgroundColor: theme === 'dark' ? '#444' : '#e3e3e3',
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 8,
      marginRight: 8,
    },
    imagePickerText: {
      color: theme === 'dark' ? '#00bfff' : '#1976d2',
      fontWeight: 'bold',
      fontSize: 13,
    },
    previewImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
      marginLeft: 6,
    },
    blogImage: {
      width: '100%',
      height: 160,
      borderRadius: 12,
      marginBottom: 12,
    },
    blogTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 6,
      color: theme === 'dark' ? '#fff' : '#1976d2',
      letterSpacing: 0.5,
    },
    blogDescription: {
      fontSize: 15,
      color: theme === 'dark' ? '#cfd8dc' : '#666',
      marginBottom: 2,
    },
    divider: {
      height: 1.5,
      backgroundColor: theme === 'dark' ? '#333652' : '#cfd8dc',
      marginVertical: 14,
      marginHorizontal: 10,
      borderRadius: 1,
    },
  });

export default BlogScreen;
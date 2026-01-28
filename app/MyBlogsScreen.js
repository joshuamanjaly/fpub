// app/MyBlogsScreen.js
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../config/firebaseConfig';

export default function MyBlogsScreen() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    const blogsRef = ref(db, 'blogs/' + user.uid);

    // Listen for changes in user's blogs
    const unsubscribe = onValue(blogsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const blogList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Sort by createdAt (newest first)
        blogList.sort((a, b) => b.createdAt - a.createdAt);
        setBlogs(blogList);
      } else {
        setBlogs([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.blogCard}>
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogContent}>{item.content}</Text>
      <Text style={styles.blogMeta}>
        Posted by {item.author} on {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Blogs</Text>
      {blogs.length === 0 ? (
        <Text style={styles.empty}>No blogs yet. Start writing!</Text>
      ) : (
        <FlatList
          data={blogs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  blogCard: { marginBottom: 15, padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  blogTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  blogContent: { fontSize: 14, marginBottom: 5 },
  blogMeta: { fontSize: 12, color: 'gray' }
});
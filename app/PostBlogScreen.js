// app/PostBlogScreen.js
import { useRouter } from 'expo-router';
import { push, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../config/firebaseConfig';

export default function PostBlogScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handlePostBlog = async () => {
    if (!user) {
      alert("Please log in first");
      return;
    }

    if (!title || !content) {
      alert("Please enter both title and content");
      return;
    }

    try {
      const blogRef = push(ref(db, 'blogs/' + user.uid));
      await set(blogRef, {
        title,
        content,
        createdAt: Date.now(),
        author: user.email
      });

      alert("Blog posted successfully!");
      setTitle('');
      setContent('');
      router.push('/MyBlogsScreen'); // ✅ Expo Router navigation
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Blog</Text>
      <TextInput
        style={styles.input}
        placeholder="Blog Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Blog Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Post Blog" onPress={handlePostBlog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  textArea: { height: 150, textAlignVertical: 'top' }
});
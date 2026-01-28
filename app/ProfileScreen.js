import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { get, ref, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { useTheme } from './context/ThemeContext'; // Import the hook

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme(); // Get theme values
  
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;
    get(ref(db, 'users/' + user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setName(data.name || '');
        setBio(data.bio || '');
      }
    });
  }, [user]);

  const handleSave = async () => {
    try {
      await set(ref(db, 'users/' + user.uid), { name, bio, email: user.email });
      alert("Profile updated!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Dark Mode Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          {theme === 'light' ? '☀️ Swayam Mode' : '🌙 Adithya Mode'}
        </Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>My Profile</Text>

      <TextInput 
        style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} 
        placeholder="Name" 
        placeholderTextColor={colors.placeholder}
        value={name} 
        onChangeText={setName} 
      />
      <TextInput 
        style={[styles.input, { backgroundColor: colors.input, color: colors.text, borderColor: colors.border }]} 
        placeholder="Bio" 
        placeholderTextColor={colors.placeholder}
        value={bio} 
        onChangeText={setBio} 
      />

      <Button title="Save Profile" onPress={handleSave} />

      <View style={styles.divider} />

      <Button title="Write a Blog" color="green" onPress={() => router.push('/PostBlogScreen')} />
      <View style={{ marginTop: 10 }}>
        <Button title="View My Blogs" color="orange" onPress={() => router.push('/MyBlogsScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  toggleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 18, fontWeight: 'bold' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 20 }
});
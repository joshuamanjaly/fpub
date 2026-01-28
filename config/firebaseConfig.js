import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3oZWkYVhtJmRFqz1KaiEk6_KwUFF2V68",
  authDomain: "fpub-69a65.firebaseapp.com",
  // I added this line so your database works!
  databaseURL: "https://fpub-69a65-default-rtdb.firebaseio.com", 
  projectId: "fpub-69a65",
  storageBucket: "fpub-69a65.firebasestorage.app",
  messagingSenderId: "606485367138",
  appId: "1:606485367138:web:0521ab94ab2995b60a043b",
  measurementId: "G-Z4GMZSTMWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence (Keeps user logged in)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };


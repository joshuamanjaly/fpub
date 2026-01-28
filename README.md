.

📱 React Native Blog App (Firebase + Expo)
A full-featured mobile blogging application built with React Native (Expo) and Firebase. This app allows users to create accounts, manage their profiles, switch between Dark/Light themes, and publish personal blogs in real-time.

✨ Features
🔐 Secure Authentication: User Login and Sign Up powered by Firebase Auth.

📝 Real-time Blogging: Create and save blog posts instantly using Firebase Realtime Database.

👤 User Profiles: Customize your profile with a Name and Bio.

🌗 Dark & Light Mode: Built-in theme manager that persists user preference.

💾 Persistent Login: Users stay logged in even after closing the app (AsyncStorage).

📱 Cross-Platform: Runs smoothly on both Android and iOS.

🛠️ Tech Stack
Frontend: React Native, Expo Router

Backend: Firebase (Authentication, Realtime Database)

Storage: Async Storage (for session & theme persistence)

Language: JavaScript

📸 Screenshots
Login Screen	Dark Mode Profile	My Blogs
(Add your screenshot here)	(Add your screenshot here)	(Add your screenshot here)
🚀 Getting Started
To run this project locally on your machine, follow these steps:

1. Clone the repository
Bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
2. Install dependencies
Bash
npm install
3. Setup Firebase
Create a project at Firebase Console.

Enable Authentication (Email/Password).

Create a Realtime Database (Start in Test Mode).

Copy your web config keys.

4. Configure Environment
Create a file named config/firebaseConfig.js and add your keys:

JavaScript
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getDatabase(app);

export { auth, db };
5. Run the App
Bash
npx expo start -c
Scan the QR code with the Expo Go app on your phone.

🔮 Future Plans
[ ] Add Public Feed to view other users' blogs.

[ ] Enable Image Uploads for profiles (Firebase Storage).

[ ] Add "Edit" and "Delete" functionality for blogs.

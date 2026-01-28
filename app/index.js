import { Redirect } from 'expo-router';

export default function Index() {
  // This immediately sends the user to the Login Screen
  return <Redirect href="/LoginScreen" />;
}
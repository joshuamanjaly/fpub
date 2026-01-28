import { Stack } from 'expo-router';
import { ThemeProvider } from './context/ThemeContext'; // Import the new file

export default function Layout() {
  return (
    // Wrap the whole app in ThemeProvider
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      />
    </ThemeProvider>
  );
}
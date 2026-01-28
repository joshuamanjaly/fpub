// app/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import MyBlogsScreen from './MyBlogsScreen';
import PostBlogScreen from './PostBlogScreen';
import ProfileScreen from './ProfileScreen';
import SignupScreen from './SignupScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="PostBlogScreen" component={PostBlogScreen} options={{ title: 'Write Blog' }} />
        <Stack.Screen name="MyBlogsScreen" component={MyBlogsScreen} options={{ title: 'My Blogs' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
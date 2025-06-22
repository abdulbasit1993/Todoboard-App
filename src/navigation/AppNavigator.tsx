import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useDispatch } from 'react-redux';
import { Appearance } from 'react-native';
import { updateSystemTheme } from '../redux/slices/themeSlice';
import SplashScreen from '../screens/SplashScreen';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(updateSystemTheme(colorScheme));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

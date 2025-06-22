import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import Spacer from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace('Auth');
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [navigation]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        const timer = setTimeout(() => {
          if (token) {
            navigation.replace('Main', { screen: 'Home' });
          } else {
            navigation.replace('Auth');
          }
        }, 2000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.log('Error checking token: ', error);
        navigation.replace('Auth');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Todoboard</Text>
      <Spacer mT={20} />
      <ActivityIndicator size={'large'} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.white,
    fontSize: ms(45),
    fontWeight: '700',
  },
});

export default SplashScreen;

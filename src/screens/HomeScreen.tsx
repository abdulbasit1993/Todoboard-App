import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';
import { textColors } from '../constants/colors';
import FloatingActionButton from '../components/FloatingActionButton';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeReducer.theme);
  const user = useSelector(state => state.userReducer.user);

  const greeting: () => string = () => {
    let now: Date = new Date();
    let hours: number = now.getHours();
    let greeting: string = '';

    if (hours >= 5 && hours < 12) {
      greeting = 'Morning';
    } else if (hours >= 12 && hours < 17) {
      greeting = 'Afternoon';
    } else {
      greeting = 'Evening';
    }

    return greeting;
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      />

      <Header title={'Todoboard'} withDrawer={true} />

      <View style={styles.subContainer}>
        <Spacer mT={50} />

        <Text
          style={[styles.greetText, { color: textColors[theme] }]}
        >{`Good ${greeting()}!`}</Text>
      </View>

      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddTodo');
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: ms(15),
  },
  greetText: {
    fontSize: ms(20),
    fontWeight: '700',
  },
});

export default HomeScreen;

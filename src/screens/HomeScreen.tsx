import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import { ms } from 'react-native-size-matters';

const HomeScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      />

      <Header title={'Todoboard'} isHome={true} />

      <View style={styles.subContainer}>
        <Spacer mT={50} />
      </View>
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
});

export default HomeScreen;

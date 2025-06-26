import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.container}
    >
      <Ionicon name="add" color={colors.white} style={{ fontSize: ms(25) }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: ms(45),
    height: ms(45),
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: ms(15),
    bottom: ms(15),
  },
});

export default FloatingActionButton;

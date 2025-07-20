import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { textColors } from '../constants/colors';

const Checkbox = ({ isChecked, onToggle }) => {
  const theme = useSelector(state => state.themeReducer.theme);
  return (
    <TouchableOpacity
      onPress={() => {
        onToggle(!isChecked);
      }}
      style={[styles.container, { borderColor: textColors[theme] }]}
    >
      {isChecked && (
        <FeatherIcon
          name="check"
          color={textColors[theme]}
          style={{ fontSize: ms(20) }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ms(25),
    height: ms(25),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Checkbox;

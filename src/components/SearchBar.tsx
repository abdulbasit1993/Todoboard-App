import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { borderColors, colors, textColors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const SearchBar = ({ value, onChangeText }) => {
  const theme = useSelector(state => state.themeReducer.theme);
  return (
    <View style={[styles.container, { borderColor: borderColors[theme] }]}>
      <View style={{ width: '85%' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={{ color: textColors[theme] }}
          placeholder="Search"
          placeholderTextColor={'#A9A9A9'}
        />
      </View>
      <View>
        <Ionicon
          name="search"
          color={textColors[theme]}
          style={{ fontSize: ms(25) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 80,
    padding: ms(10),
  },
});

export default SearchBar;

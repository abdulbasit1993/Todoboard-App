import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { borderColors, textColors } from '../constants/colors';
import { useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({ value, onChangeText, placeholder, inputType }) => {
  const theme = useSelector(state => state.themeReducer.theme);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: borderColors[theme],
        },
      ]}
    >
      {inputType === 'password' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: '90%' }}>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={'#A9A9A9'}
              style={[styles.input, { color: textColors[theme] }]}
              secureTextEntry={showPassword ? false : true}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Ionicon
                  name="eye-off"
                  color={textColors[theme]}
                  style={{ fontSize: ms(20) }}
                />
              ) : (
                <Ionicon
                  name="eye"
                  color={textColors[theme]}
                  style={{ fontSize: ms(20) }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#A9A9A9'}
          style={[styles.input, { color: textColors[theme] }]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ms(45),
    paddingHorizontal: ms(10),
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    width: '100%',
    fontSize: ms(16),
  },
});

export default CustomInput;

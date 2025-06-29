import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, textColors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { CustomButtonTypes } from '../types/CustomButtonTypes';

const CustomButton: React.FC<CustomButtonTypes> = ({
  title,
  onPress,
  loading,
  disabled,
  customStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, customStyle]}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: '100%',
    height: ms(45),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: ms(17),
  },
});

export default CustomButton;

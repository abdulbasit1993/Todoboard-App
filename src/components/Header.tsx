import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HeaderProps } from '../types/HeaderTypes';
import { backgroundColors, colors, textColors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Header: React.FC<HeaderProps> = ({ title, isHome }) => {
  const theme = useSelector(state => state.themeReducer.theme);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {isHome && (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <Ionicon
              name="menu"
              color={colors.white}
              style={{ fontSize: ms(25) }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.center}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.right}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: ms(60),
  },
  titleText: {
    color: colors.white,
    fontSize: ms(18),
    fontWeight: '700',
  },
  left: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;

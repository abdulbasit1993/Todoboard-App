import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { backgroundColors, colors, textColors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initials from 'initials';
import Spacer from './Spacer';
import { menuItems } from '../constants/menuData';
import Ionicon from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {
  const theme = useSelector(state => state.themeReducer.theme);

  const user = useSelector(state => state.userReducer.user);

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColors[theme] }]}
    >
      <View>
        <TouchableOpacity
          onPress={() => props?.navigation?.closeDrawer()}
          style={styles.closeIconBtn}
        >
          <Ionicon
            name="close"
            color={textColors[theme]}
            style={{ fontSize: ms(30) }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.initialsContainer}>
        <Text style={{ color: colors.white, fontSize: ms(20) }}>
          {initials(user?.username)}
        </Text>
      </View>

      <Spacer mT={20} />
      <View style={{ marginLeft: ms(15) }}>
        <Text style={[styles.nameText, { color: textColors[theme] }]}>
          {user?.username}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}

        {menuItems?.map(item => {
          return (
            <DrawerItem
              key={item.id}
              label={item.title}
              onPress={() => {
                props.navigation.navigate(item.screenName);
              }}
              style={{ backgroundColor: backgroundColors[theme] }}
              labelStyle={{ color: textColors[theme] }}
            />
          );
        })}
      </DrawerContentScrollView>
      <DrawerItem
        label={'Logout'}
        onPress={() => {
          console.log('Logout pressed...');
          AsyncStorage.clear();
          props.navigation.navigate('Auth');
        }}
        style={styles.logoutItem}
        labelStyle={styles.logoutLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  logoutItem: {
    marginBottom: ms(120),
  },
  logoutLabel: {
    color: '#FF0000',
    fontSize: ms(16),
    fontWeight: '600',
  },
  initialsContainer: {
    backgroundColor: '#2b7fff',
    borderRadius: 90,
    width: ms(50),
    height: ms(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ms(60),
    marginHorizontal: ms(15),
  },
  nameText: {
    color: colors.white,
    fontSize: ms(17),
  },
  closeIconBtn: {
    position: 'absolute',
    right: ms(15),
    top: ms(15),
  },
});

export default CustomDrawer;

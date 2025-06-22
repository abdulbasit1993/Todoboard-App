import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Spacer from '../components/Spacer';
import { ms } from 'react-native-size-matters';
import { colors, textColors } from '../constants/colors';
import CustomButton from '../components/CustomButton';

const SignUpScreen = ({ navigation }) => {
  const theme = useSelector(state => state.themeReducer.theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      />

      <Header title={'Todoboard'} />

      <View style={styles.subContainer}>
        <Spacer mT={50} />
        <Text style={[styles.heading, { color: textColors[theme] }]}>
          Sign Up
        </Text>

        <Spacer mT={50} />

        <Text style={[styles.label, { color: textColors[theme] }]}>Email:</Text>
        <Spacer mT={10} />

        <CustomInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Enter Your Email...'}
        />

        <Spacer mT={30} />

        <Text style={[styles.label, { color: textColors[theme] }]}>
          Password:
        </Text>
        <Spacer mT={10} />

        <CustomInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Enter Your Password...'}
          inputType={'password'}
        />

        <Spacer mT={30} />

        <Text style={[styles.label, { color: textColors[theme] }]}>
          Confirm Password:
        </Text>
        <Spacer mT={10} />

        <CustomInput
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder={'Re-enter Your Password...'}
          inputType={'password'}
        />

        <Spacer mT={30} />

        <CustomButton
          title={'Submit'}
          onPress={() => {
            console.log('email : ', email, ' --- password : ', password);
          }}
        />

        <Spacer mT={30} />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColors[theme] }]}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text
              style={[
                styles.footerText,
                { color: colors.primary, marginLeft: 10 },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
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
  label: {
    fontSize: ms(16),
    fontWeight: '600',
  },
  heading: {
    fontSize: ms(35),
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: ms(17),
    textAlign: 'center',
  },
});

export default SignUpScreen;

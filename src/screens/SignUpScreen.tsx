import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../components/ScreenWrapper';
import Spacer from '../components/Spacer';
import { ms } from 'react-native-size-matters';
import { colors, textColors } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import { validateEmail, validatePassword } from '../utils/validations';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const theme = useSelector(state => state.themeReducer.theme);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    const sanitizedUsername = username.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();
    const sanitizedConfirmPassword = confirmPassword.trim();

    try {
      const payload = {
        username: sanitizedUsername,
        email: sanitizedEmail,
        password: sanitizedPassword,
      };

      const isEmailValid = validateEmail(sanitizedEmail);
      const isPasswordValid = validatePassword(sanitizedPassword);

      if (!sanitizedUsername) {
        setLoading(false);
        ToastAndroid.show('Username is Required!', ToastAndroid.SHORT);
        return;
      }

      if (isEmailValid.isValid === false && isEmailValid.isEmpty === true) {
        setLoading(false);
        ToastAndroid.show('Email is Required!', ToastAndroid.SHORT);
        return;
      }

      if (isEmailValid.isValid === false && isEmailValid.isEmpty === false) {
        setLoading(false);
        ToastAndroid.show('Email is in Invalid Format!', ToastAndroid.SHORT);
        return;
      }

      if (
        isPasswordValid.isValid === false &&
        isPasswordValid.isEmpty === true
      ) {
        setLoading(false);
        ToastAndroid.show('Password is Required!', ToastAndroid.SHORT);
        return;
      }

      if (
        isPasswordValid.isValid === false &&
        isPasswordValid.isEmpty === false
      ) {
        setLoading(false);
        ToastAndroid.show(
          'Password must be at least 6 characters long!',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (sanitizedPassword !== sanitizedConfirmPassword) {
        setLoading(false);
        ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
        return;
      }

      if (
        isEmailValid.isValid === true &&
        isEmailValid.isEmpty === false &&
        isPasswordValid.isValid === true &&
        isPasswordValid.isEmpty === false &&
        sanitizedUsername !== '' &&
        sanitizedPassword === sanitizedConfirmPassword
      ) {
        console.log('form inputs are valid, calling signup API...');

        const response = await api.post('/auth/signup', payload);

        console.log('response data (signup) ===>> ', response);

        if (response?.data?.success === true) {
          AsyncStorage.setItem('@token', response?.data?.token);
          ToastAndroid.show('Signup Successful!', ToastAndroid.SHORT);
          navigation.navigate('Main', { screen: 'Home' });
        }
      }
    } catch (error) {
      console.log('Error in signup: ', error);

      if (error?.response?.data) {
        ToastAndroid.show(error?.response?.data?.message, ToastAndroid.SHORT);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Header title={'Todoboard'} />

        <ScrollView>
          <View style={styles.subContainer}>
            <Spacer mT={30} />
            <Text style={[styles.heading, { color: textColors[theme] }]}>
              Sign Up
            </Text>

            <Spacer mT={30} />

            <Text style={[styles.label, { color: textColors[theme] }]}>
              Username:
            </Text>
            <Spacer mT={10} />

            <CustomInput
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder={'Enter Your Username...'}
            />

            <Spacer mT={30} />

            <Text style={[styles.label, { color: textColors[theme] }]}>
              Email:
            </Text>
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
                onSubmit();
              }}
              loading={loading}
              disabled={loading}
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
        </ScrollView>
      </KeyboardAvoidingView>
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

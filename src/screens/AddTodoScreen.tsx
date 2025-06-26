import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { textColors, colors, borderColors } from '../constants/colors';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddTodoScreen = () => {
  const theme = useSelector(state => state.themeReducer.theme);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log('A date has been picked: ', date.toDateString());
    hideDatePicker();
  };

  const onSubmit = () => {};

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
        <Header title={'Add Todo'} />

        <ScrollView>
          <View style={styles.subContainer}>
            <Spacer mT={30} />

            <Text style={[styles.label, { color: textColors[theme] }]}>
              Title:
            </Text>
            <Spacer mT={10} />

            <CustomInput
              value={title}
              onChangeText={text => {
                setTitle(text);
              }}
              placeholder={'Enter Todo Title...'}
            />

            <Spacer mT={30} />

            <Text style={[styles.label, { color: textColors[theme] }]}>
              Description:
            </Text>
            <Spacer mT={10} />

            <CustomInput
              value={description}
              onChangeText={text => {
                setDescription(text);
              }}
              placeholder={'Enter Todo Description...'}
              multiline={true}
            />

            <Spacer mT={30} />

            <Text style={[styles.label, { color: textColors[theme] }]}>
              Due Date:
            </Text>
            <Spacer mT={10} />

            <TouchableOpacity
              onPress={showDatePicker}
              activeOpacity={0.8}
              style={[styles.datePicker, { borderColor: borderColors[theme] }]}
            >
              <Text style={{ color: '#A9A9A9' }}>Tap to Select Due Date</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onChange={(event, selectedDate) => {
                console.log('selectedDate: ', selectedDate);
              }}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
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
  datePicker: {
    width: '100%',
    height: ms(45),
    paddingHorizontal: ms(10),
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
});

export default AddTodoScreen;

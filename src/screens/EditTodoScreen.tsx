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
  ToastAndroid,
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
import moment from 'moment';
import api from '../utils/api';
import DropDownPicker from 'react-native-dropdown-picker';

const EditTodoScreen = ({ navigation, route }) => {
  const theme = useSelector(state => state.themeReducer.theme);
  const data = route?.params?.data;
  const [title, setTitle] = useState(data?.title || '');
  const [description, setDescription] = useState(data?.description || '');
  const [selectedDate, setSelectedDate] = useState(
    data?.dueDate ? new Date(data?.dueDate) : new Date(),
  );
  const [isDateSelected, setIsDateSelected] = useState(!!data?.dueDate);
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.status || null);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ]);

  console.log('dropdown value: ', value);

  console.log('data (EditTodo) : ', data);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.log('A date has been picked: ', date.toDateString());
    setSelectedDate(date);
    setIsDateSelected(true);
    hideDatePicker();
  };

  const onSubmit = async () => {
    setLoading(true);
    const sanitizedTitle = title.trim();
    const sanitizedDescription = description.trim();

    try {
      if (!sanitizedTitle) {
        ToastAndroid.show('Title is Required!', ToastAndroid.SHORT);
        return;
      }

      if (isDateSelected !== false) {
        if (selectedDate < new Date()) {
          ToastAndroid.show('Please select a future date!', ToastAndroid.SHORT);
        }
      }

      let payload = {
        title: sanitizedTitle,
        description: sanitizedDescription,
        status: value,
      };

      if (isDateSelected !== false) {
        payload = {
          ...payload,
          dueDate: selectedDate,
        };
      }

      const response = await api.put(`/todos/update/${data?._id}`, payload);

      console.log('response data (update todo): ', response);

      if (response?.data?.success) {
        ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT);
        setTitle('');
        setDescription('');
        setSelectedDate(new Date());
        setIsDateSelected(false);
        navigation.navigate('MyTodos');
      }
    } catch (error) {
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
        <Header title={'Edit Todo'} withDrawer={true} />

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

            {data?.dueDate && (
              <>
                <Spacer mT={30} />

                <Text style={[styles.label, { color: textColors[theme] }]}>
                  Due Date:
                </Text>
                <Spacer mT={10} />

                <TouchableOpacity
                  onPress={showDatePicker}
                  activeOpacity={0.8}
                  style={[
                    styles.datePicker,
                    { borderColor: borderColors[theme] },
                  ]}
                >
                  {isDateSelected ? (
                    <Text style={{ color: textColors[theme] }}>
                      {moment(selectedDate).format('DD-MM-YYYY')}
                    </Text>
                  ) : (
                    <Text style={{ color: '#A9A9A9' }}>
                      Tap to Select Due Date
                    </Text>
                  )}
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </>
            )}

            <Spacer mT={30} />
            <Text style={[styles.label, { color: textColors[theme] }]}>
              Status:
            </Text>
            <Spacer mT={10} />

            {/* Status dropdown */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              placeholder="Select Status"
              placeholderStyle={{ color: '#A9A9A9' }}
              style={[
                styles.datePicker,
                {
                  borderColor: borderColors[theme],
                  backgroundColor: 'transparent',
                },
              ]}
              textStyle={{
                color: textColors[theme],
                fontSize: ms(16),
              }}
              dropDownContainerStyle={{
                borderColor: borderColors[theme],
                borderRadius: 8,
                backgroundColor: '#fff',
              }}
              listItemLabelStyle={{
                color: colors.black,
              }}
              arrowIconStyle={{
                tintColor: textColors[theme],
              }}
              zIndex={1000}
            />

            <Spacer mT={30} />

            <CustomButton
              title={'Update'}
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

export default EditTodoScreen;

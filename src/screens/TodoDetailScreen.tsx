import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import Spacer from '../components/Spacer';
import { textColors } from '../constants/colors';
import { capitalizeFirstLetter } from '../utils/helper';
import moment from 'moment';
import CustomButton from '../components/CustomButton';
import { ModalRef } from '../App';
import api from '../utils/api';

const TodoDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeReducer.theme);
  const data = route?.params?.data;

  console.log('data from route params: ', data);

  const handleDeleteTodo = async () => {
    try {
      const response = await api.delete(`/todos/delete/${data?._id}`);

      console.log('response from delete todo: ', response);

      if (response?.data?.success) {
        ModalRef?.current?.hideModal();
        ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT);
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error deleting todo: ', error);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      />

      <Header title={'Todo Details'} withDrawer={true} />

      <Spacer mT={20} />

      <ScrollView style={styles.subContainer}>
        <View>
          <Text style={[styles.label, { color: textColors[theme] }]}>
            Title:
          </Text>

          <Spacer mT={10} />

          <Text style={[styles.contentText, { color: textColors[theme] }]}>
            {data?.title}
          </Text>

          <Spacer mT={30} />

          <Text style={[styles.label, { color: textColors[theme] }]}>
            Description:
          </Text>

          <Spacer mT={10} />

          <Text style={[styles.contentText, { color: textColors[theme] }]}>
            {data?.description}
          </Text>

          <Spacer mT={30} />

          <Text style={[styles.label, { color: textColors[theme] }]}>
            Status:
          </Text>

          <Spacer mT={10} />

          <Text style={[styles.contentText, { color: textColors[theme] }]}>
            {capitalizeFirstLetter(data?.status)}
          </Text>

          <Spacer mT={30} />

          {data?.dueDate && (
            <>
              <Text style={[styles.label, { color: textColors[theme] }]}>
                Due Date:
              </Text>

              <Spacer mT={10} />

              <Text style={[styles.contentText, { color: textColors[theme] }]}>
                {moment(data?.dueDate).format('DD-MM-YYYY')}
              </Text>

              <Spacer mT={30} />
            </>
          )}

          <Text style={[styles.label, { color: textColors[theme] }]}>
            Created At:
          </Text>

          <Spacer mT={10} />

          <Text style={[styles.contentText, { color: textColors[theme] }]}>
            {moment(data?.createdAt).format('DD-MM-YYYY')}
          </Text>

          <Spacer mT={30} />

          <Text style={[styles.label, { color: textColors[theme] }]}>
            Updated At:
          </Text>

          <Spacer mT={10} />

          <Text style={[styles.contentText, { color: textColors[theme] }]}>
            {moment(data?.updatedAt).format('DD-MM-YYYY')}
          </Text>

          <Spacer mT={30} />

          <View>
            <CustomButton title={'Edit'} />

            <Spacer mT={10} />

            <CustomButton
              title={'Delete'}
              onPress={() => {
                ModalRef.current?.showModal('DeleteTodo', {
                  onConfirm() {
                    handleDeleteTodo();
                  },
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
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
    fontSize: ms(20),
    fontWeight: '700',
  },
  contentText: {
    fontSize: ms(18),
    fontWeight: '400',
  },
});

export default TodoDetailScreen;

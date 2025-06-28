import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { useFocusEffect } from '@react-navigation/native';
import { fetchTodos } from '../redux/slices/todoSlice';
import { borderColors, textColors } from '../constants/colors';
import Spacer from '../components/Spacer';
import SearchBar from '../components/SearchBar';
import { capitalizeFirstLetter } from '../utils/helper';

const TodosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useSelector(state => state.themeReducer.theme);
  const todos = useSelector(state => state.todoReducer.data);
  const loading = useSelector(state => state.todoReducer.loading);

  const renderTodoItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('TodoDetail', { data: item })}
        style={[styles.todoItemContainer, { borderColor: borderColors[theme] }]}
      >
        <View>
          <Text style={[styles.todoItemText, { color: textColors[theme] }]}>
            {item.title}
          </Text>
        </View>
        <View>
          <Text style={[styles.todoItemText, { color: textColors[theme] }]}>
            {capitalizeFirstLetter(item.status)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTodos());
    }, []),
  );

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent={false}
      />

      <Header title={'My Todos'} withDrawer={true} />

      <Spacer mT={20} />

      <View style={styles.subContainer}>
        <SearchBar
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />

        <Spacer mT={20} />

        <FlatList data={todos} renderItem={renderTodoItem} />
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
  todoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: ms(15),
    marginBottom: ms(15),
  },
  todoItemText: {
    fontSize: ms(16),
  },
});

export default TodosScreen;

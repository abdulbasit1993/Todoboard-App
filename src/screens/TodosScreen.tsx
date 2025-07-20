import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import { useFocusEffect } from '@react-navigation/native';
import { fetchTodos, toggleTodoStatus } from '../redux/slices/todoSlice';
import { borderColors, colors, textColors } from '../constants/colors';
import Spacer from '../components/Spacer';
import SearchBar from '../components/SearchBar';
import { capitalizeFirstLetter } from '../utils/helper';
import _ from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../components/CustomButton';
import Checkbox from '../components/Checkbox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const TodosScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useSelector(state => state.themeReducer.theme);
  const todos = useSelector(state => state.todoReducer.data);
  const loading = useSelector(state => state.todoReducer.fetchLoading);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ]);

  const handleToggleStatus = item => {
    console.log('item: ', item);

    dispatch(toggleTodoStatus(item?._id));
  };

  const renderTodoItem = ({ item }) => {
    return (
      <View
        style={[styles.todoItemContainer, { borderColor: borderColors[theme] }]}
      >
        <View style={styles.checkboxContainer}>
          <Checkbox
            isChecked={item.status === 'completed'}
            onToggle={() => {
              handleToggleStatus(item);
            }}
          />
          <View>
            <Text style={[styles.todoItemText, { color: textColors[theme] }]}>
              {item.title}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('TodoDetail', { data: item })}
          >
            <FontAwesomeIcon
              name="edit"
              color={textColors[theme]}
              style={{ fontSize: ms(20) }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const debouncedChangeHandler = useMemo(
    () => _.debounce(text => getTodos(text), 1500),
    [],
  );

  const handleInputChange = text => {
    setSearchTerm(text);
    debouncedChangeHandler(text);
  };

  const getTodos = text => {
    dispatch(fetchTodos({ text, status: value }));
  };

  useFocusEffect(
    useCallback(() => {
      getTodos();
    }, [value]),
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

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
        <SearchBar value={searchTerm} onChangeText={handleInputChange} />

        <Spacer mT={20} />

        <View style={styles.filterContainer}>
          <View style={{ width: '60%' }}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              placeholder="Filter by status"
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
          </View>

          <View style={{ width: '40%' }}>
            <CustomButton
              title="Clear Filter"
              onPress={() => {
                setValue(null);
              }}
            />
          </View>
        </View>

        {loading ? (
          <View>
            <ActivityIndicator size={'large'} color={textColors[theme]} />
          </View>
        ) : (
          <FlatList
            data={todos}
            renderItem={renderTodoItem}
            ListEmptyComponent={() => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={[styles.noDataText, { color: textColors[theme] }]}
                  >
                    No Todos Found
                  </Text>
                </View>
              );
            }}
          />
        )}
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
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: ms(15),
    marginBottom: ms(15),
  },
  todoItemText: {
    fontSize: ms(16),
    marginLeft: ms(10),
  },
  noDataText: {
    fontSize: ms(18),
  },
  datePicker: {
    width: '90%',
    height: ms(45),
    paddingHorizontal: ms(10),
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: ms(25),
  },
  checkboxContainer: {
    width: '60%',
    flexDirection: 'row',
  },
});

export default TodosScreen;

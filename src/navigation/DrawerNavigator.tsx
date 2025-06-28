import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import HomeScreen from '../screens/HomeScreen';
import AddTodoScreen from '../screens/AddTodoScreen';
import TodosScreen from '../screens/TodosScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="AddTodo" component={AddTodoScreen} />
      <Drawer.Screen name="MyTodos" component={TodosScreen} />
      <Drawer.Screen name="TodoDetail" component={TodoDetailScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

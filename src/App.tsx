import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalProvider } from './components/ModalProvider';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ModalProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </ModalProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { iModalRef } from './types/ModalTypes';
import AppModal from './components/AppModal';

export const ModalRef = {
  current: null as iModalRef | null,
};

const App = () => {
  const modalRef = useRef<iModalRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ModalRef.current = modalRef.current;
      console.log('ModalRef.current set to:', ModalRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          <AppModal ref={modalRef} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

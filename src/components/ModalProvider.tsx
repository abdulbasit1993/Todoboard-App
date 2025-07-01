import React, { createContext, useContext, useState } from 'react';
import { ModalTypes } from '../types/ModalTypes';
import { ModalProps } from 'react-native-modal';
import AppModal from './AppModal';

interface ModalContextType {
  showModal: (type: ModalTypes, props?: Partial<ModalProps>) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [modalProps, setModalProps] = useState<Partial<ModalProps>>({});

  const showModal = (type: ModalTypes, props: Partial<ModalProps> = {}) => {
    setModalType(type);
    setModalProps(props);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalType(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <AppModal
        isVisible={isVisible}
        modalType={modalType}
        modalProps={modalProps}
      />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

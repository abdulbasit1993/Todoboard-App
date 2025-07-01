import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { ModalProps, iModalRef, ModalTypes } from '../types/ModalTypes';
import { ms } from 'react-native-size-matters';
import ConfirmLogout from './ModalContent/ConfirmLogout';
import { backgroundColors, borderColors } from '../constants/colors';
import { useSelector } from 'react-redux';
import ConfirmDeleteTodo from './ModalContent/ConfirmDeleteTodo';
import { useModal } from './ModalProvider';

interface AppModalProps {
  isVisible: boolean;
  modalType: ModalTypes | null;
  modalProps: Partial<ModalProps>;
}

const AppModal: React.FC<AppModalProps> = ({
  isVisible,
  modalType,
  modalProps,
}) => {
  const theme = useSelector(state => state.themeReducer.theme);
  const { hideModal } = useModal();
  const renderContent = () => {
    const commonProps = {
      onClose: () => {
        hideModal();
        modalProps.onClose?.();
      },
      ...modalProps,
    };

    switch (modalType) {
      case 'ConfirmLogout':
        return <ConfirmLogout {...commonProps} />;
      case 'DeleteTodo':
        return <ConfirmDeleteTodo {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropOpacity={0.5}
      style={styles.modal}
    >
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: backgroundColors[theme],
            borderColor: borderColors[theme],
          },
        ]}
      >
        {renderContent()}
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
  },
  modalContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: ms(15),
    width: '80%',
    maxWidth: ms(400),
    alignItems: 'center',
  },
});

export default AppModal;

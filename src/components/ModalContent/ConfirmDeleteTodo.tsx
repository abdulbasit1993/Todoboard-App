import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { textColors } from '../../constants/colors';
import { ms } from 'react-native-size-matters';
import { ModalProps } from '../../types/ModalTypes';
import { useSelector } from 'react-redux';
import Spacer from '../Spacer';
import CustomButton from '../CustomButton';
const ConfirmDeleteTodo = ({ onClose, onConfirm }: ModalProps) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeIconBtn}>
        <Ionicon
          name="close"
          color={textColors[theme]}
          style={{ fontSize: ms(30) }}
        />
      </TouchableOpacity>

      <Spacer mT={30} />

      <View>
        <Text style={[styles.messageText, { color: textColors[theme] }]}>
          Are you sure you want to delete this todo?
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Yes"
          onPress={() => {
            onConfirm();
          }}
          customStyle={{ width: '40%' }}
        />
        <CustomButton
          title="No"
          onPress={onClose}
          customStyle={{ width: '40%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    borderRadius: 12,
    width: '100%',
  },
  closeIconBtn: {
    position: 'absolute',
    right: ms(10),
  },
  messageText: {
    fontSize: ms(18),
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ms(25),
  },
});

export default ConfirmDeleteTodo;

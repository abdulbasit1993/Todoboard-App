import { ViewStyle } from 'react-native';

export type CustomButtonTypes = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  width?: ViewStyle;
};

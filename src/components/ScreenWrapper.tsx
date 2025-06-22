import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { backgroundColors, colors } from '../constants/colors';

const ScreenWrapper = ({ style, children, ...rest }) => {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: backgroundColors[theme] || colors.white, flex: 1 },
        style,
      ]}
      {...rest}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

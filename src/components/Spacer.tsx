import React from 'react';
import { View } from 'react-native';

const Spacer = ({
  mT = 0,
  mB = 0,
  mL = 0,
  mR = 0,
}: {
  mT?: number;
  mB?: number;
  mL?: number;
  mR?: number;
}) => {
  return (
    <View
      style={{
        marginTop: mT,
        marginBottom: mB,
        marginLeft: mL,
        marginRight: mR,
      }}
    ></View>
  );
};

export default Spacer;

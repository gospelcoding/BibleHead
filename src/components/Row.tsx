import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

interface IProps {
  spaceBetween?: boolean;
}

export default function Row(props: PropsWithChildren<IProps>) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: props.spaceBetween ? 'space-between' : 'flex-start',
      }}>
      {props.children}
    </View>
  );
}

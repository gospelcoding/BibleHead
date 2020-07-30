import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

interface IProps {}

export default function Container(props: PropsWithChildren<IProps>) {
  return <View style={{flex: 1}}>{props.children}</View>;
}

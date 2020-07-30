import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

interface IProps {}

export default function Row(props: PropsWithChildren<IProps>) {
  return <View style={{flexDirection: 'row'}}>{props.children}</View>;
}

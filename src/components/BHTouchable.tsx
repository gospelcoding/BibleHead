import React, {PropsWithChildren, ComponentProps} from 'react';
import {TouchableOpacity} from 'react-native';

export default function BHTouchable(
  props: PropsWithChildren<ComponentProps<typeof TouchableOpacity>>,
) {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
}

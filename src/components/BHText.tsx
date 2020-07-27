import React, {ComponentProps, PropsWithChildren} from 'react';
import {StyleSheet, Text} from 'react-native';

interface IProps extends PropsWithChildren<ComponentProps<typeof Text>> {}

export default function BHText(props: IProps) {
  const {children, style, ...otherProps} = props;

  const finalStyle = [textStyle.textView, style];

  return (
    <Text style={finalStyle} {...otherProps}>
      {children}
    </Text>
  );
}

const textStyle = StyleSheet.create({
  textView: {
    fontSize: 18,
    padding: 8,
    margin: 8,
  },
});

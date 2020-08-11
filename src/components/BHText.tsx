import React, {ComponentProps, PropsWithChildren} from 'react';
import {StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import ThemeColors from '../util/ThemeColors';

interface IProps {
  textBreakStrategy?: ComponentProps<typeof Text>['textBreakStrategy'];
  subdued?: boolean;
  heading?: boolean;
  subheading?: boolean;
}

export default function BHText(props: PropsWithChildren<IProps>) {
  const finalStyle: StyleProp<TextStyle> = [textStyle.textView];

  if (props.heading) finalStyle.push({fontSize: 24, fontWeight: 'bold'});
  if (props.subheading) finalStyle.push({fontWeight: 'bold'});
  if (props.subdued)
    finalStyle.push({fontSize: 12, color: ThemeColors.darkGrey});

  return <Text style={finalStyle}>{props.children}</Text>;
}

const textStyle = StyleSheet.create({
  textView: {
    fontSize: 18,
    margin: 8,
  },
});

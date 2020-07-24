import React, {ComponentProps, useState} from 'react';
import {StyleSheet} from 'react-native';
import ThemeColors from './ThemeColors';
import {TextInput} from 'react-native';

interface IProps extends ComponentProps<typeof TextInput> {}

export default function BHTextInput(props: IProps) {
  const {style, onFocus, onBlur, ...otherProps} = props;
  const [focus, setFocus] = useState(props.autoFocus || false);

  const finalStyle = [
    bhTextInputStyle.input,
    focus ? bhTextInputStyle.focusedInput : {},
    style,
  ];

  return (
    <TextInput
      {...otherProps}
      style={finalStyle}
      onFocus={(e) => {
        setFocus(true);
        if (onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setFocus(false);
        if (onBlur) onBlur(e);
      }}
    />
  );
}

const bhTextInputStyle = StyleSheet.create({
  input: {
    borderBottomColor: ThemeColors.grey,
    borderBottomWidth: 1,
    margin: 4,
    fontSize: 24,
  },
  focusedInput: {
    borderBottomColor: ThemeColors.blue,
  },
});

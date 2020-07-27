import React, {ComponentProps} from 'react';
import Checkbox from '@react-native-community/checkbox';
import {Platform, View} from 'react-native';
import ThemeColors from '../util/ThemeColors';
import BHText from './BHText';

interface IProps extends ComponentProps<typeof Checkbox> {
  small?: boolean;
  label: string;
}

export default function BHCheckbox(props: IProps) {
  const {small, label, ...otherProps} = props;
  const cbSize = small ? 18 : 26;
  const fontSize = small ? 22 : 32;
  const uncheckedLabelColor = Platform.OS == 'ios' ? 'black' : '#666';
  return (
    <View style={{flexDirection: 'row'}}>
      <Checkbox
        // checkedImage={require('./checkbox-checked-2.png')}
        // uncheckedImage={require('./checkbox-unchecked.png')}
        // checkboxStyle={{height: cbSize, width: cbSize}}
        {...otherProps}
      />
      <BHText
        style={{
          color: props.checked ? ThemeColors.green : uncheckedLabelColor,
          fontSize: fontSize,
        }}>
        {label}
      </BHText>
    </View>
  );
}

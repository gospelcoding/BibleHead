import React, {ComponentProps} from 'react';
import Checkbox from '@react-native-community/checkbox';
import {Platform, View, StyleSheet} from 'react-native';
import ThemeColors from '../util/ThemeColors';
import BHText from './BHText';
import BHTouchable from './BHTouchable';

const isIos = Platform.OS == 'ios';

interface IProps {
  small?: boolean;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function BHCheckbox(props: IProps) {
  const {small, label, ...otherProps} = props;
  const cbSize = small ? 18 : 26;
  const fontSize = small ? 22 : 32;

  return (
    <View style={styles.container}>
      <Checkbox
        tintColors={{true: ThemeColors.lightBlue}}
        onCheckColor={ThemeColors.lightBlue}
        onTintColor={ThemeColors.lightBlue}
        style={styles.checkbox}
        value={props.value}
        onValueChange={props.onValueChange}
      />
      <View style={styles.labelContainer}>
        <BHTouchable
          backgroundColor={ThemeColors.white}
          onPress={() => props.onValueChange(!props.value)}>
          {() => (
            <View>
              <BHText>{label}</BHText>
            </View>
          )}
        </BHTouchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  checkbox: {},
  labelContainer: {
    marginLeft: isIos ? 0 : -8,
  },
});

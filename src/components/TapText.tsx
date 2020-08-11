import React from 'react';
import {StyleSheet, View} from 'react-native';
import ThemeColors from '../util/ThemeColors';
import BHTouchable from './BHTouchable';
import BHText from './BHText';

interface IProps {
  text: string;
  onPress: () => void;
}

export default function TapText(props: IProps) {
  return (
    <BHTouchable onPress={props.onPress} backgroundColor={ThemeColors.white}>
      {(backgroundColor) => (
        <View style={[style.container, {backgroundColor}]}>
          <BHText>{props.text}</BHText>
        </View>
      )}
    </BHTouchable>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 4,
    borderColor: ThemeColors.grey,
    borderWidth: 1,
    borderRadius: 16,
    margin: 16,
  },
});

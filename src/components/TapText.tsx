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
    <BHTouchable onPress={props.onPress}>
      <View style={style.container}>
        <BHText>{props.text}</BHText>
      </View>
    </BHTouchable>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 8,
    borderBottomColor: ThemeColors.grey,
    borderBottomWidth: 1,
  },
});

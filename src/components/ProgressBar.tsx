import React from 'react';
import ThemeColors from '../util/ThemeColors';
import {View, StyleSheet} from 'react-native';

interface IProps {
  width: number;
  progress: number; // 0-100
  color: keyof typeof ThemeColors;
}

export default function ProgressBar(props: IProps) {
  const barWidth = (props.width * props.progress) / 100;

  return (
    <View style={[styles.container, {width: props.width}]}>
      <View
        style={[
          styles.bar,
          {backgroundColor: ThemeColors[props.color], width: barWidth},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    flexDirection: 'row',
    backgroundColor: ThemeColors.grey,
  },
  bar: {
    height: 4,
  },
});

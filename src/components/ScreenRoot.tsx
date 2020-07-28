import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ThemeColors from '../util/ThemeColors';

interface IProps {}

export default function ScreenRoot(props: PropsWithChildren<IProps>) {
  return <SafeAreaView style={style.screenRoot}>{props.children}</SafeAreaView>;
}

const style = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: ThemeColors.white,
  },
});

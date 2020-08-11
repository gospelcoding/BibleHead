import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useT} from '../i18n/i18nReact';
import ThemeColors from '../util/ThemeColors';
import BHButton from './BHButton';

interface IProps {
  undoAction: () => void;
  message: string;
}

export default function UndoAlert(props: IProps) {
  const t = useT();
  let buttonText = t('Undo');

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{props.message}</Text>
      <BHButton onPress={props.undoAction} title={t('Undo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000BB',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
  undoButton: {
    color: ThemeColors.blue,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

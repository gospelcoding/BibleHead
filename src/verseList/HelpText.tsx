import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ThemeColors from '../util/ThemeColors';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import ElevatedView from 'react-native-elevated-view';

interface IProps {
  text: string;
  header: string;
  onDismiss: () => void;
}

export default function HelpText(props: IProps) {
  const t = useT();
  return (
    <ElevatedView elevation={20} style={styles.container}>
      <Text style={styles.header}>{props.header}</Text>
      <Text style={styles.text}>{props.text}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <BHButton onPress={props.onDismiss} title={t('GotIt')} />
      </View>
    </ElevatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.white,
    padding: 8,
    paddingBottom: 0,
    marginTop: 8,
    borderColor: ThemeColors.grey,
    borderWidth: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 0,
  },
  header: {
    color: ThemeColors.blue,
    fontWeight: 'bold',
    fontSize: 24,
  },
  text: {
    fontSize: 18,
  },
});

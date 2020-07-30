import React from 'react';
import {View, ScrollView, Text, Platform} from 'react-native';
import {Passage} from './parsePassage';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import ThemeColors from '../util/ThemeColors';
import {refText} from '../verses/Verse';

interface IProps {
  passage: Passage;
  saveVerse: () => void;
}

export default function BGPassageDisplay(props: IProps) {
  const t = useT();
  return (
    <View
      style={{
        maxHeight: '50%',
        backgroundColor: 'white',
        padding: 8,
        paddingBottom: 0,
        marginTop: 8,
      }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            paddingBottom: Platform.OS == 'android' ? 50 : undefined,
          }}>
          <Text style={{fontWeight: 'bold'}}>
            {refText(props.passage.ref) + ' '}
          </Text>
          {props.passage.text}
        </Text>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 8,
        }}>
        <View
          style={Platform.select({
            android: {
              position: 'absolute',
              end: 16,
              bottom: 16,
            },
          })}>
          <BHButton
            title={t('Save')}
            color={ThemeColors.buttonBlueOrGreen}
            onPress={props.saveVerse}
            buttonStyle={Platform.OS == 'android' ? {padding: 8} : {}}
          />
        </View>
      </View>
    </View>
  );
}

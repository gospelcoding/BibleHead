import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Passage} from './parsePassage';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import ThemeColors from '../util/ThemeColors';
import {refText} from '../verses/Verse';
import ElevatedView from 'react-native-elevated-view';

interface IProps {
  passage: Passage;
  saveVerse: () => void;
}

export default function BGPassageDisplay(props: IProps) {
  const t = useT();
  return (
    <ElevatedView
      elevation={20}
      style={{
        maxHeight: '50%',
        backgroundColor: ThemeColors.white,
        padding: 8,
        paddingBottom: 0,
        marginTop: 8,
        borderColor: ThemeColors.grey,
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomWidth: 0,
      }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            paddingBottom: 80,
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
          style={{
            position: 'absolute',
            end: 16,
            bottom: 16,
          }}>
          <BHButton
            title={t('Save')}
            onPress={props.saveVerse}
            // buttonStyle={Platform.OS == 'android' ? {padding: 8} : {}}
          />
        </View>
      </View>
    </ElevatedView>
  );
}

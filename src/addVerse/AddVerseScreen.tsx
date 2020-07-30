import React from 'react';
import ScreenRoot from '../components/ScreenRoot';
import {View} from 'react-native';
import BHText from '../components/BHText';
import {useAppSelector} from '../BHState';
import {useT} from '../i18n/i18nReact';
import BHButton from '../components/BHButton';
import {useDispatch} from 'react-redux';
import {settingsSlice} from '../settings/Settings';
import {NavigationProp} from '@react-navigation/native';
import {BHRootNav} from '../BibleHeadApp';
import BibleGateway from './BibleGateway';
import VerseEditor from './VerseEditor';
import versesSlice from '../verseList/versesSlice';

interface IProps {
  navigation: NavigationProp<BHRootNav, 'AddVerse'>;
}

export default function AddVerseScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const bibleGateway = useAppSelector(
    (state) => state.settings.useBibleGateway,
  );

  return (
    <ScreenRoot>
      <View style={{flexDirection: 'row'}}>
        <BHText>{bibleGateway ? t('BibleGateway') : t('ManualEntry')}</BHText>
        <View style={{flex: 1}} />
        <BHButton
          title={bibleGateway ? t('ManualEntry') : t('BibleGateway')}
          onPress={() => dispatch(settingsSlice.actions.toggleBibleGateway())}
        />
      </View>
      {bibleGateway ? (
        <BibleGateway done={() => navigation.navigate('Verses')} />
      ) : (
        <VerseEditor
          done={() => navigation.navigate('Verses')}
          saveVerse={(verse) => dispatch(versesSlice.actions.add([verse]))}
        />
      )}
    </ScreenRoot>
  );
}

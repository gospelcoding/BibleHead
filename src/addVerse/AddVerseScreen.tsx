import React, {useState} from 'react';
import ScreenRoot from '../components/ScreenRoot';
import {View} from 'react-native';
import BHText from '../components/BHText';
import {useAppSelector} from '../BHState';
import {useT} from '../i18n/i18nReact';
import BHButton from '../components/BHButton';
import {useDispatch} from 'react-redux';
import {settingsSlice} from '../settings/Settings';
import {NavigationProp} from '@react-navigation/native';
import BibleGateway from './BibleGateway';
import VerseEditor from './VerseEditor';
import {BHRootTabs} from '../BHRootNav';
import {LATEST_VERSE} from '../learning/useVerseById';
import versesSlice, {versesUpdateAction} from '../verseList/versesSlice';

interface IProps {
  navigation: NavigationProp<BHRootTabs, 'AddVerse'>;
}

export default function AddVerseScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const bibleGateway = useAppSelector(
    (state) => state.settings.useBibleGateway,
  );

  const [verseEdKey, setVerseEdKey] = useState(1);
  const done = (saved: boolean) => {
    if (saved)
      navigation.navigate('Verses', {
        screen: 'VerseShow',
        params: {id: LATEST_VERSE},
        initial: false,
      });
    else setVerseEdKey(verseEdKey + 1);
  };

  return (
    <ScreenRoot>
      <View style={{flexDirection: 'row'}}>
        <BHText heading>
          {bibleGateway ? t('BibleGateway') : t('ManualEntry')}
        </BHText>
        <View style={{flex: 1}} />
        <BHButton
          title={bibleGateway ? t('ManualEntry') : t('BibleGateway')}
          onPress={() => dispatch(settingsSlice.actions.toggleBibleGateway())}
        />
      </View>
      {bibleGateway ? (
        <BibleGateway done={() => done(true)} />
      ) : (
        <VerseEditor
          key={verseEdKey}
          done={done}
          saveVerse={(verse) =>
            dispatch(versesUpdateAction(versesSlice.actions.add([verse])))
          }
        />
      )}
    </ScreenRoot>
  );
}

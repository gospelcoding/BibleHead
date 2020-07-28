import React from 'react';
import {
  NavigationProp,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';

import {View, SafeAreaView} from 'react-native';
import {Verse, refText} from '../verses/Verse';
import BHText from '../components/BHText';
import BHButton from '../components/BHButton';
import {VersesStackNav} from './VersesStack';
import {BHRootNav} from '../BibleHeadApp';
import {useDispatch} from 'react-redux';
import versesSlice from './versesSlice';
import {useT} from '../i18n/i18nReact';
import BHIconButton from '../components/BHIconButton';
import BHCheckbox from '../components/BHCheckbox';

interface IProps {
  navigation: CompositeNavigationProp<
    NavigationProp<VersesStackNav, 'VerseShow'>,
    NavigationProp<BHRootNav>
  >;
  route: RouteProp<VersesStackNav, 'VerseShow'>;
}

export default function VerseShowScreen({navigation, route}: IProps) {
  const dispatch = useDispatch();
  const t = useT();

  const verse = route.params.verse;

  const editVerse = () => {
    dispatch(versesSlice.actions.setDraftVerse(verse));
    navigation.navigate('AddVerse');
  };

  const removeVerse = () => {
    navigation.navigate('VerseList');
    dispatch(versesSlice.actions.remove(verse.id));
  };

  return (
    <SafeAreaView>
      <BHText>{refText(verse)}</BHText>
      <BHText>{verse.text}</BHText>
      <BHIconButton name="trash" onPress={removeVerse} />
      <BHCheckbox
        label={t('Learned')}
        value={verse.learned}
        onValueChange={() =>
          dispatch(versesSlice.actions.toggleLearned(verse.id))
        }
      />
      <BHIconButton name="create" onPress={editVerse} />
    </SafeAreaView>
  );
}

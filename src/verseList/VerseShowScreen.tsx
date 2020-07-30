import React, {useState} from 'react';
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
import VerseEditor from '../addVerse/VerseEditor';
import ScreenRoot from '../components/ScreenRoot';
import {useAppSelector} from '../BHState';
import {ScrollView} from 'react-native-gesture-handler';

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

  const verse = useAppSelector((state) => state.verses.verses).find(
    (v) => v.id == route.params.id,
  );

  const [editing, setEditing] = useState(false);

  if (!verse) return null;

  const removeVerse = () => {
    navigation.navigate('VerseList');
    dispatch(versesSlice.actions.remove(verse.id));
  };

  return (
    <ScreenRoot>
      {editing ? (
        <VerseEditor
          done={() => setEditing(false)}
          saveVerse={(verse) => dispatch(versesSlice.actions.update(verse))}
          verse={verse}
        />
      ) : (
        <ScrollView>
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
          <BHIconButton name="create" onPress={() => setEditing(true)} />
        </ScrollView>
      )}
    </ScreenRoot>
  );
}

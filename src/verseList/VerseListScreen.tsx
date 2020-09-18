import React, {useEffect} from 'react';
import {useAppSelector} from '../BHState';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {refText, Verse, normalizeVerses, verseStrength} from '../verses/Verse';
import BHText from '../components/BHText';
import DividingLine from '../components/DividingLine';
import {useT, useBibleBooks} from '../i18n/i18nReact';
import {useDispatch} from 'react-redux';
import {
  NavigationProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {VersesStackNav} from './VersesStack';
import versesSlice, {versesUpdateAction} from './versesSlice';
import {LearningStackNav} from '../learning/LearningStack';
import {BHRootTabs} from '../BHRootNav';
import ProgressBar from '../components/ProgressBar';
import ScreenRoot from '../components/ScreenRoot';

interface IProps {
  navigation: CompositeNavigationProp<
    CompositeNavigationProp<
      NavigationProp<VersesStackNav, 'VerseList'>,
      NavigationProp<BHRootTabs>
    >,
    NavigationProp<LearningStackNav>
  >;
}

export default function VerseListScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();
  const verses = useAppSelector((state) => state.verses.verses);
  const bookNames = useBibleBooks();

  const learnVerse = (verse: Verse) => {
    navigation.navigate('DoLearn', {
      review: {toReview: [], toLearn: [verse.id], verseCount: 1},
    });
  };

  useEffect(() => {
    normalizeVerses(
      verses,
      (verse) =>
        dispatch(versesUpdateAction(versesSlice.actions.update(verse))),
      bookNames,
    );
  }, []);

  return (
    <ScreenRoot>
      <FlatList
        data={verses}
        renderItem={(verse) => (
          <ListItem
            verse={verse.item}
            learnVerse={() => learnVerse(verse.item)}
            goToVerse={() =>
              navigation.navigate('VerseShow', {id: verse.item.id})
            }
          />
        )}
        keyExtractor={(verse) => `${verse.id}`}
        ItemSeparatorComponent={DividingLine}
        ListHeaderComponent={() => <BHText heading>{t('MyVerses')}</BHText>}
      />
    </ScreenRoot>
  );
}

function ListItem(props: {
  verse: Verse;
  learnVerse: () => void;
  goToVerse: () => void;
}) {
  const t = useT();
  const progress = verseStrength(props.verse);
  return (
    <TouchableOpacity onPress={props.goToVerse}>
      <View style={{flexDirection: 'row'}}>
        <BHText>{refText(props.verse)}</BHText>
        <View style={{flexGrow: 1}} />
        <View style={{alignSelf: 'center', paddingEnd: 8}}>
          {props.verse.learned && (
            <ProgressBar
              width={100}
              progress={progress}
              color={progress >= 85 ? 'green' : 'yellow'}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

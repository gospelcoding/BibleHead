import React, {useEffect} from 'react';
import {useAppSelector} from '../BHState';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {refText, Verse, normalizeVerses} from '../verses/Verse';
import BHText from '../components/BHText';
import DividingLine from '../components/DividingLine';
import BHButton from '../components/BHButton';
import {useT, useBibleBooks} from '../i18n/i18nReact';
import {useDispatch} from 'react-redux';
import {
  NavigationProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {VersesStackNav} from './VersesStack';
import {BHRootNav} from '../BibleHeadApp';
import versesSlice from './versesSlice';

interface IProps {
  navigation: CompositeNavigationProp<
    NavigationProp<VersesStackNav, 'VerseList'>,
    NavigationProp<BHRootNav>
  >;
}

export default function VerseListScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const verses = useAppSelector((state) => state.verses.verses);
  const bookNames = useBibleBooks();

  const learnVerse = (verse: Verse) => {
    dispatch(versesSlice.actions.learnAVerse(verse));
    navigation.navigate('Learning');
  };

  useEffect(() => {
    normalizeVerses(
      verses,
      (verse) => dispatch(versesSlice.actions.update(verse)),
      bookNames,
    );
  }, []);

  return (
    <SafeAreaView>
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
      />
    </SafeAreaView>
  );
}

function ListItem(props: {
  verse: Verse;
  learnVerse: () => void;
  goToVerse: () => void;
}) {
  const t = useT();
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={props.goToVerse}>
        <BHText>
          {props.verse.bookId}: {refText(props.verse)}
        </BHText>
      </TouchableOpacity>
      <View style={{flexGrow: 1}} />
      {!props.verse.learned && (
        <BHButton title={t('Practice')} onPress={props.learnVerse} />
      )}
    </View>
  );
}

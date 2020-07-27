import React from 'react';
import {useAppSelector} from '../BHState';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {refText, Verse} from '../verses/Verse';
import BHText from '../components/BHText';
import DividingLine from '../components/DividingLine';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import {useDispatch} from 'react-redux';
import learningSlice from '../learning/learningSlice';
import {NavigationProp} from '@react-navigation/native';

interface IProps {
  navigation: NavigationProp<any, any>;
}

export default function VerseListScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const verses = useAppSelector((state) => state.verses.verses);

  const learnVerse = (verse: Verse) => {
    dispatch(learningSlice.actions.learnAVerse(verse));
    navigation.navigate('Learning');
  };

  return (
    <SafeAreaView>
      <FlatList
        data={verses}
        renderItem={(verse) => (
          <ListItem
            verse={verse.item}
            learnVerse={() => learnVerse(verse.item)}
          />
        )}
        keyExtractor={(verse) => `${verse.id}`}
        ItemSeparatorComponent={DividingLine}
      />
    </SafeAreaView>
  );
}

function ListItem(props: {verse: Verse; learnVerse: () => void}) {
  const t = useT();
  return (
    <View style={{flexDirection: 'row'}}>
      <BHText>
        {props.verse.id}: {refText(props.verse)}
      </BHText>
      <View style={{flexGrow: 1}} />
      {!props.verse.learned && (
        <BHButton title={t('Practice')} onPress={props.learnVerse} />
      )}
    </View>
  );
}

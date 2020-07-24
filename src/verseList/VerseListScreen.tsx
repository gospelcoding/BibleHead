import React from 'react';
import {useAppSelector} from '../BHState';
import {FlatList, SafeAreaView, Text} from 'react-native';
import {refText} from '../verses/Verse';

export default function VerseListScreen() {
  const verses = useAppSelector((state) => state.verses);

  return (
    <SafeAreaView>
      <FlatList
        data={verses}
        renderItem={(verse) => <Text>{refText(verse.item)}</Text>}
      />
    </SafeAreaView>
  );
}

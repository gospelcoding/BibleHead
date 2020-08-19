import {useEffect} from 'react';
import {Verse, refText} from '../verses/Verse';
import {NavigationProp} from '@react-navigation/native';

export default function useSetVerseRefTitle(
  navigation: NavigationProp<any>,
  verse: Verse | undefined,
) {
  useEffect(() => {
    if (verse) navigation.setOptions({title: refText(verse)});
  }, [verse && refText(verse)]);
}

import React, {useEffect} from 'react';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import BHText from '../components/BHText';
import {useAppSelector} from '../BHState';
import BHTextInput from '../util/BHTextInput';
import {refText} from '../verses/Verse';
import HideWordsGame from './HideWordsGame';
import {useDispatch} from 'react-redux';
import {BHRootNav} from '../BibleHeadApp';
import CommonStyles from '../util/CommonStyles';
import {useNextLearningVerse, useNextReviewVerse} from './useNextLearningVerse';
import ShowWordsGame from './ShowWordsGame';
import versesSlice from '../verseList/versesSlice';
import ReviewSummary from './ReviewSummary';

interface IProps {
  navigation: NavigationProp<BHRootNav, 'Learning'>;
}

export default function LearningScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const reviewVerse = useNextReviewVerse();
  const learnVerse = useNextLearningVerse();

  const done = () => {
    navigation.navigate('Verses');
    dispatch(versesSlice.actions.clearLearning());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Start review if coming to this screen and no review in progress

      if (!reviewVerse && !learnVerse)
        dispatch(versesSlice.actions.startReview());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (reviewVerse) {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <ShowWordsGame key={reviewVerse.id} verse={reviewVerse} />
      </SafeAreaView>
    );
  }

  if (learnVerse) {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <HideWordsGame key={learnVerse.id} verse={learnVerse} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.screenRoot}>
      <ReviewSummary addVerse={() => navigation.navigate('AddVerse')} />
    </SafeAreaView>
  );
}

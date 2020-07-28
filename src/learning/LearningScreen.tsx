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
import ScreenRoot from '../components/ScreenRoot';
import ShuffleWordsGame from './ShuffleWordsGame';

interface IProps {
  navigation: NavigationProp<BHRootNav, 'Learning'>;
}

export default function LearningScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const reviewVerse = useNextReviewVerse();
  const learnVerse = useNextLearningVerse();
  const learnGame = useAppSelector((state) => state.settings.learnGame);

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

    return unsubscribe;
  }, [navigation]);

  if (reviewVerse) {
    return (
      <ScreenRoot>
        <ShowWordsGame key={reviewVerse.id} verse={reviewVerse} />
      </ScreenRoot>
    );
  }

  if (learnVerse) {
    return (
      <ScreenRoot>
        {learnGame == 'HideWords' ? (
          <HideWordsGame key={learnVerse.id} verse={learnVerse} />
        ) : (
          <ShuffleWordsGame key={learnVerse.id} verse={learnVerse} />
        )}
      </ScreenRoot>
    );
  }

  return (
    <ScreenRoot>
      <ReviewSummary addVerse={() => navigation.navigate('AddVerse')} />
    </ScreenRoot>
  );
}

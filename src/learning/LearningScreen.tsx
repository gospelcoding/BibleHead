import React, {useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {View} from 'react-native';
import BHText from '../components/BHText';
import {useAppSelector} from '../BHState';
import {refText} from '../verses/Verse';
import HideWordsGame from './HideWordsGame';
import {useDispatch} from 'react-redux';
import {BHRootNav} from '../BibleHeadApp';
import {useNextLearningVerse, useNextReviewVerse} from './useNextLearningVerse';
import ShowWordsGame from './ShowWordsGame';
import versesSlice from '../verseList/versesSlice';
import ReviewSummary from './ReviewSummary';
import ScreenRoot from '../components/ScreenRoot';
import ShuffleWordsGame from './ShuffleWordsGame';
import SwitchGameButton from './SwitchGameButton';
import ThemeColors from '../util/ThemeColors';

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
        <View
          style={{flexDirection: 'row', backgroundColor: ThemeColors.darkBlue}}>
          <BHText>{refText(learnVerse)}</BHText>
          <View style={{flex: 1}} />
          <SwitchGameButton game={learnGame} />
        </View>
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

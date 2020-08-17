import React, {useEffect} from 'react';
import {
  NavigationProp,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import {View} from 'react-native';
import BHText from '../components/BHText';
import {useAppSelector} from '../BHState';
import {refText} from '../verses/Verse';
import HideWordsGame from './HideWordsGame';
import {useDispatch} from 'react-redux';
import {useVerseById} from './useVerseById';
import ShowWordsGame from './ShowWordsGame';
import versesSlice, {versesUpdateAction} from '../verseList/versesSlice';
import ScreenRoot from '../components/ScreenRoot';
import ShuffleWordsGame from './ShuffleWordsGame';
import SwitchGameButton from './SwitchGameButton';
import ThemeColors from '../util/ThemeColors';
import Row from '../components/Row';
import {LearningStackNav} from './LearningStack';

export type BHReview = {
  toReview: number[];
  toLearn: number[];
};

interface IProps {
  navigation: NavigationProp<LearningStackNav, 'DoLearn'>;
  route: RouteProp<LearningStackNav, 'DoLearn'>;
}

export default function LearningScreen({navigation, route}: IProps) {
  const dispatch = useDispatch();

  const {toReview, toLearn} = route.params.review;
  const reviewVerse = useVerseById(toReview[0]);
  const learnVerse = useVerseById(toLearn[0]);
  const learnGame = useAppSelector((state) => state.settings.learnGame);
  const verse = reviewVerse || learnVerse;

  const didPracticeLearnVerse = () => {
    if (!learnVerse) return;
    dispatch(
      versesUpdateAction(versesSlice.actions.practiceDone(learnVerse.id)),
    );
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Start review if coming to this screen and no review in progress
  //     if (!reviewVerse && !learnVerse)
  //       dispatch(versesSlice.actions.startReview());
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const done = () => {
    const nextReview: BHReview =
      toReview.length > 0
        ? {toReview: toReview.slice(1), toLearn}
        : {toReview, toLearn: toLearn.slice(1)};

    if (nextReview.toLearn.length == 0 && nextReview.toReview.length == 0) {
      navigation.dispatch(StackActions.pop());
    } else {
      navigation.dispatch(
        StackActions.replace('DoLearn', {review: nextReview}),
      );
    }
  };

  useEffect(() => {
    if (verse) {
      navigation.setOptions({title: refText(verse)});
    }
  }, [verse && refText(verse)]);

  if (reviewVerse) {
    return (
      <ScreenRoot>
        <ShowWordsGame key={reviewVerse.id} verse={reviewVerse} done={done} />
      </ScreenRoot>
    );
  }

  if (learnVerse) {
    return (
      <ScreenRoot>
        <Row>
          <BHText heading>{refText(learnVerse)}</BHText>
          <View style={{flex: 1}} />
          <SwitchGameButton game={learnGame} />
        </Row>
        {learnGame == 'HideWords' ? (
          <HideWordsGame
            key={learnVerse.id}
            verse={learnVerse}
            didPractice={didPracticeLearnVerse}
            done={done}
          />
        ) : (
          <ShuffleWordsGame
            key={learnVerse.id}
            verse={learnVerse}
            didPractice={didPracticeLearnVerse}
            done={done}
          />
        )}
      </ScreenRoot>
    );
  }

  return (
    <ScreenRoot>
      <BHText>Error - shouldn't see this!</BHText>
    </ScreenRoot>
  );
}

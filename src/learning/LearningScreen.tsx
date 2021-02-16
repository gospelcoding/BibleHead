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
import Row from '../components/Row';
import {LearningStackNav} from './LearningStack';
import {useT} from '../i18n/i18nReact';
import FloatWordsGame from './FloatWordsGame';
import ElevatedView from 'react-native-elevated-view';

export type BHReview = {
  toReview: number[];
  toLearn: number[];
  verseCount: number;
};

interface IProps {
  navigation: NavigationProp<LearningStackNav, 'DoLearn'>;
  route: RouteProp<LearningStackNav, 'DoLearn'>;
}

export default function LearningScreen({navigation, route}: IProps) {
  const dispatch = useDispatch();
  const t = useT();

  const {toReview, toLearn, verseCount} = route.params.review;
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

  const done = () => {
    const nextReview: BHReview =
      toReview.length > 0
        ? {toReview: toReview.slice(1), toLearn, verseCount}
        : {toReview, toLearn: toLearn.slice(1), verseCount};

    if (nextReview.toLearn.length == 0 && nextReview.toReview.length == 0) {
      navigation.dispatch(StackActions.pop());
    } else {
      navigation.dispatch(
        StackActions.replace('DoLearn', {review: nextReview}),
      );
    }
  };

  useEffect(() => {
    const current = 1 + verseCount - toReview.length - toLearn.length;
    navigation.setOptions({title: t('xOfY', {x: current, y: verseCount})});
  }, [verse && refText(verse)]);

  useEffect(() => {
    if (!reviewVerse && !learnVerse) navigation.goBack();
  });

  if (reviewVerse) {
    return (
      <ScreenRoot>
        <BHText heading>{refText(reviewVerse)}</BHText>
        <ShowWordsGame key={reviewVerse.id} verse={reviewVerse} done={done} />
      </ScreenRoot>
    );
  }

  if (learnVerse) {
    return (
      <ScreenRoot>
        <ElevatedView elevation={8} style={{backgroundColor: '#FFFFFF'}}>
          <Row spaceBetween>
            <View style={{flexShrink: 1}}>
              <BHText heading>{refText(learnVerse)}</BHText>
            </View>
            <SwitchGameButton game={learnGame} />
          </Row>
        </ElevatedView>

        {learnGame == 'HideWords' ? (
          <HideWordsGame
            key={learnVerse.id}
            verse={learnVerse}
            didPractice={didPracticeLearnVerse}
            done={done}
          />
        ) : learnGame == 'ShuffleWords' ? (
          <ShuffleWordsGame
            key={learnVerse.id}
            verse={learnVerse}
            didPractice={didPracticeLearnVerse}
            done={done}
          />
        ) : (
          <FloatWordsGame
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

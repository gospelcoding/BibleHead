import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import BHText from '../components/BHText';
import {useAppSelector} from '../BHState';
import BHTextInput from '../util/BHTextInput';
import {refText, practiceParams} from '../verses/Verse';
import HideWordsGame from './HideWordsGame';
import {useDispatch} from 'react-redux';
import learningSlice, {useNextLearningVerse} from './learningSlice';
import {BHRootNav} from '../BibleHeadApp';
import CommonStyles from '../util/CommonStyles';

interface IProps {
  navigation: NavigationProp<BHRootNav, 'Learning'>;
}

export default function LearningScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const verse = useNextLearningVerse();

  const done = () => {
    navigation.navigate('VerseList');
    dispatch(learningSlice.actions.clear());
  };

  if (!verse)
    return (
      <SafeAreaView>
        <BHText>Learn it!</BHText>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={CommonStyles.screenRoot}>
      <HideWordsGame
        verse={verse}
        practiceParams={practiceParams(verse)}
        goHome={done}
      />
    </SafeAreaView>
  );
}

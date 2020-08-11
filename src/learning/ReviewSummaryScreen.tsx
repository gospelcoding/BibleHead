import React from 'react';
import {useAppSelector} from '../BHState';
import {sameDay} from '../util/util';
import {View} from 'react-native';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import BHText from '../components/BHText';
import {selectReviewVersesAndLearningVerse} from '../verses/Verse';
import Container from '../components/Container';
import ScreenRoot from '../components/ScreenRoot';
import {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import {BHRootTabs} from '../BHRootNav';
import {LearningStackNav} from './LearningStack';

interface IProps {
  navigation: CompositeNavigationProp<
    NavigationProp<BHRootTabs, 'Learning'>,
    NavigationProp<LearningStackNav>
  >;
}

export default function ReviewSummaryScreen({navigation}: IProps) {
  const t = useT();

  const verses = useAppSelector((state) => state.verses.verses);
  const today = new Date();
  const reviewedToday = verses.filter(
    (v) =>
      sameDay(today, new Date(v.lastReview || 0)) ||
      sameDay(today, new Date(v.lastPracticed || 0)),
  );

  if (verses.length == 0) {
    return (
      <View>
        <BHText>{t('NoVerses')}</BHText>
        <BHButton
          title={t('AddVerse')}
          onPress={() => navigation.navigate('AddVerse')}
        />
      </View>
    );
  }

  return (
    <ScreenRoot>
      <Container>
        <BHText heading>
          {t('VersesReviewedToday', {number: `${reviewedToday.length}`})}
        </BHText>
      </Container>
      <BHButton
        title={t('ReviewVerses')}
        onPress={() =>
          navigation.navigate('DoLearn', {
            review: selectReviewVersesAndLearningVerse(verses),
          })
        }
      />
    </ScreenRoot>
  );
}

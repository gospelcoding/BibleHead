import {useState, useEffect} from 'react';
import {localDateString} from '../util/util';
import {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import {BHRootTabs} from '../BHRootNav';
import {LearningStackNav} from './LearningStack';
import {selectReviewVersesAndLearningVerse, Verse} from '../verses/Verse';
import {AppState, AppStateStatus} from 'react-native';

export default function useAutoReview(
  verses: Verse[],
  navigation: CompositeNavigationProp<
    NavigationProp<BHRootTabs, 'Learning'>,
    NavigationProp<LearningStackNav>
  >,
) {
  const [lastAutoReview, setLastAutoReview] = useState('');

  const triggerAutoReviewIfNeeded = () => {
    // Auto review if it's our first time on this screen today
    const today = localDateString(new Date());

    if (today !== lastAutoReview) {
      setLastAutoReview(today);
      navigation.navigate('DoLearn', {
        review: selectReviewVersesAndLearningVerse(verses),
      });
    }
  };

  useEffect(() => {
    // Listen to both nav focus, and appstate->active to triggerAutoReviewIfNeeded
    const unsubscribeNavListener = navigation.addListener(
      'focus',
      triggerAutoReviewIfNeeded,
    );
    const eventHandler = (state: AppStateStatus) => {
      if (state == 'active') triggerAutoReviewIfNeeded();
    };
    AppState.addEventListener('change', eventHandler);

    return () => {
      unsubscribeNavListener();
      AppState.removeEventListener('change', eventHandler);
    };
  });
}

import React from 'react';
import {
  NavigationProp,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {VersesStackNav} from './VersesStack';
import {BHRootTabs} from '../BHRootNav';
import {LearningStackNav} from '../learning/LearningStack';
import {useVerseById} from '../learning/useVerseById';
import useSetVerseRefTitle from './useSetVerseRefTitle';
import ScreenRoot from '../components/ScreenRoot';
import PassageSplitter from './PassageSplitter';

interface IProps {
  navigation: CompositeNavigationProp<
    CompositeNavigationProp<
      NavigationProp<VersesStackNav, 'PassageSplitter'>,
      NavigationProp<BHRootTabs>
    >,
    NavigationProp<LearningStackNav>
  >;
  route: RouteProp<VersesStackNav, 'PassageSplitter'>;
}

export default function PassageSplitterScreen({navigation, route}: IProps) {
  const verse = useVerseById(route.params.id);

  useSetVerseRefTitle(navigation, verse);

  return (
    <ScreenRoot>
      {verse && (
        <PassageSplitter verse={verse} done={() => navigation.goBack()} />
      )}
    </ScreenRoot>
  );
}

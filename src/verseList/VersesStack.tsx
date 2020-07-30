import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {BHRootNav} from '../BibleHeadApp';
import {createStackNavigator} from '@react-navigation/stack';
import VerseListScreen from './VerseListScreen';
import VerseShowScreen from './VerseShowScreen';

interface IProps {
  navigation: NavigationProp<BHRootNav, 'Verses'>;
}

export type VersesStackNav = {
  VerseList: undefined;
  VerseShow: {id: number};
};

const Stack = createStackNavigator<VersesStackNav>();

export default function VersesStack(props: IProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VerseList" component={VerseListScreen} />
      <Stack.Screen name="VerseShow" component={VerseShowScreen} />
    </Stack.Navigator>
  );
}

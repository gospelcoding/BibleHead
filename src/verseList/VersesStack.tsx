import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import VerseListScreen from './VerseListScreen';
import VerseShowScreen from './VerseShowScreen';
import {BHRootTabs} from '../BHRootNav';
import PassageSplitterScreen from './PassageSplitterScreen';
import {useT} from '../i18n/i18nReact';

interface IProps {
  navigation: NavigationProp<BHRootTabs, 'Verses'>;
  route: RouteProp<BHRootTabs, 'Verses'>;
}

export type VersesStackNav = {
  VerseList: undefined;
  VerseShow: {id: number};
  PassageSplitter: {id: number};
};

const Stack = createStackNavigator<VersesStackNav>();

export default function VersesStack(props: IProps) {
  const t = useT();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VerseList"
        component={VerseListScreen}
        options={{headerShown: false, title: ' '}}
      />
      <Stack.Screen name="VerseShow" component={VerseShowScreen} />
      <Stack.Screen name="PassageSplitter" component={PassageSplitterScreen} />
    </Stack.Navigator>
  );
}

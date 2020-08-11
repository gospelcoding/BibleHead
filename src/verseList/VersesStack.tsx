import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import VerseListScreen from './VerseListScreen';
import VerseShowScreen from './VerseShowScreen';
import {BHRootTabs} from '../BHRootNav';

interface IProps {
  navigation: NavigationProp<BHRootTabs, 'Verses'>;
  route: RouteProp<BHRootTabs, 'Verses'>;
}

export type VersesStackNav = {
  VerseList: undefined;
  VerseShow: {id: number};
};

const Stack = createStackNavigator<VersesStackNav>();

export default function VersesStack(props: IProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VerseList"
        component={VerseListScreen}
        options={{headerShown: false, title: ' '}}
      />
      <Stack.Screen name="VerseShow" component={VerseShowScreen} />
    </Stack.Navigator>
  );
}

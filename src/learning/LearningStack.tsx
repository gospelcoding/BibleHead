import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LearningScreen, {BHReview} from './LearningScreen';
import BHRootNav from '../BHRootNav';
import backButtonWorkaround from '../util/backButtonWorkaround';

export type LearningStackNav = {
  Main: undefined;
  DoLearn: {review: BHReview};
};

const Stack = createStackNavigator<LearningStackNav>();

/*
    BHRootNav is unintuitively nested in this stack according to the recommendation here:
    https://reactnavigation.org/docs/hiding-tabbar-in-screens
*/

export default function LearningStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BHRootNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoLearn"
        component={LearningScreen}
        options={backButtonWorkaround()}
      />
    </Stack.Navigator>
  );
}

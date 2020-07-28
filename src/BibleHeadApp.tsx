import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {stringsForDeviceLocale} from './i18n/i18nRN';
import {I18nContext, useT} from './i18n/i18nReact';
import BHState from './BHState';
import SettingsScreen from './settings/SettingsScreen';
import AddVerseStack from './addVerse/AddVerseStack';
import LearningScreen from './learning/LearningScreen';
import VersesStack from './verseList/VersesStack';

export type BHRootNav = {
  AddVerse: undefined;
  Verses: undefined;
  Learning: undefined;
  Preferences: undefined;
};

const Tab = createBottomTabNavigator<BHRootNav>();

function BHNavigator() {
  const t = useT();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="AddVerse" component={AddVerseStack} />
        <Tab.Screen name="Verses" component={VersesStack} />
        <Tab.Screen name="Learning" component={LearningScreen} />
        <Tab.Screen name="Preferences" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function BibleHeadApp() {
  const [deviceStrings] = useState(stringsForDeviceLocale());

  return (
    <BHState>
      <I18nContext.Provider value={deviceStrings}>
        <BHNavigator />
      </I18nContext.Provider>
    </BHState>
  );
}

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {stringsForDeviceLocale} from './i18n/i18nRN';
import {I18nContext, useT} from './i18n/i18nReact';
import BHState from './BHState';
import SettingsScreen from './settings/SettingsScreen';
import AddVerseStack from './addVerse/AddVerseStack';
import VerseListScreen from './verseList/VerseListScreen';

const Tab = createBottomTabNavigator();

function BHNavigator() {
  const t = useT();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={t('AddVerse')} component={AddVerseStack} />
        <Tab.Screen name={'VerseList'} component={VerseListScreen} />
        <Tab.Screen name={t('Preferences')} component={SettingsScreen} />
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

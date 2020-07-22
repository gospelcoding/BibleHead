import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {stringsForDeviceLocale} from './i18n/i18nRN';
import {I18nContext, useT} from './i18n/i18nReact';
import BHState from './BHState';
import SettingsScreen from './settings/SettingsScreen';

function HomeScreen() {
  const t = useT();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{t('MyVerses')}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function BHNavigator() {
  const t = useT();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={t('MyVerses')} component={HomeScreen} />
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

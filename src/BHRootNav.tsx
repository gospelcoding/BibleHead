import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useT} from './i18n/i18nReact';
import SettingsScreen from './settings/SettingsScreen';
import VersesStack from './verseList/VersesStack';
import AddVerseScreen from './addVerse/AddVerseScreen';
import Icon from 'react-native-ionicons';
import ThemeColors from './util/ThemeColors';
import ReviewSummaryScreen from './learning/ReviewSummaryScreen';

export type BHRootTabs = {
  AddVerse: undefined;
  Verses: undefined | {showLatestVerse: boolean};
  Learning: undefined;
  Preferences: undefined;
};

const Tab = createBottomTabNavigator<BHRootTabs>();

export default function BHRootNav() {
  const t = useT();

  return (
    <Tab.Navigator initialRouteName="Learning">
      <Tab.Screen
        name="AddVerse"
        component={AddVerseScreen}
        options={{
          title: t('AddVerse'),
          tabBarIcon: ({focused}) => (
            <Icon name="add" color={iconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Verses"
        component={VersesStack}
        options={{
          title: t('MyVerses'),
          tabBarIcon: ({focused}) => (
            <Icon name="list" color={iconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Learning"
        component={ReviewSummaryScreen}
        options={{
          title: t('Practice'),
          tabBarIcon: ({focused}) => (
            <Icon name="send" color={iconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Preferences"
        component={SettingsScreen}
        options={{
          title: t('Preferences'),
          tabBarIcon: ({focused}) => (
            <Icon name="cog" color={iconColor(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function iconColor(focused: boolean) {
  return focused ? ThemeColors.lightBlue : ThemeColors.grey;
}

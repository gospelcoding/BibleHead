import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {stringsForDeviceLocale} from './i18n/i18nRN';
import {I18nContext, useT} from './i18n/i18nReact';
import BHState from './BHState';
import LearningStack from './learning/LearningStack';
import {Platform, StatusBar, View, ActivityIndicator} from 'react-native';
import ThemeColors from './util/ThemeColors';
import useStartupTasks from './util/useStartupTasks';
import SplashScreen from 'react-native-splash-screen';

const isAndroid = Platform.OS == 'android';
const androidFallback = isAndroid && Platform.Version < 23;

export default function BibleHeadApp() {
  const [deviceStrings] = useState(stringsForDeviceLocale());

  return (
    <BHState>
      <I18nContext.Provider value={deviceStrings}>
        <App />
      </I18nContext.Provider>
    </BHState>
  );
}

function App() {
  const {ready} = useStartupTasks();

  useEffect(() => {
    if (ready) SplashScreen.hide();
  });

  if (!ready)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator
          size="large"
          color={isAndroid ? ThemeColors.blue : undefined}
        />
      </View>
    );

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={androidFallback ? ThemeColors.blue : ThemeColors.white}
        barStyle="dark-content"
      />
      <LearningStack />
    </NavigationContainer>
  );
}

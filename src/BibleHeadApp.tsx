import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {stringsForDeviceLocale} from './i18n/i18nRN';
import {I18nContext, useT} from './i18n/i18nReact';
import BHState from './BHState';
import LearningStack from './learning/LearningStack';
import {Platform, StatusBar} from 'react-native';
import ThemeColors from './util/ThemeColors';

const isAndroid = Platform.OS == 'android';

export default function BibleHeadApp() {
  const [deviceStrings] = useState(stringsForDeviceLocale());

  return (
    <BHState>
      <I18nContext.Provider value={deviceStrings}>
        <NavigationContainer>
          <StatusBar
            backgroundColor={ThemeColors.darkBlue}
            barStyle="dark-content"
          />
          <LearningStack />
        </NavigationContainer>
      </I18nContext.Provider>
    </BHState>
  );
}

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Platform} from 'react-native';
import Icon from 'react-native-ionicons';
import ThemeColors from './ThemeColors';

export default function backButtonWorkaround() {
  return Platform.OS == 'ios'
    ? {
        headerLeft: () => {
          const navigation = useNavigation();
          return (
            <View style={{padding: 8}}>
              <Icon
                name="arrow-back"
                color={ThemeColors.lightBlue}
                onPress={() => navigation.goBack()}
              />
            </View>
          );
        },
      }
    : {};
}

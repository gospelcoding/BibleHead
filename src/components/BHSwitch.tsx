import React from 'react';
import {Switch, Platform} from 'react-native';
import ThemeColors from '../util/ThemeColors';

const isIOS = Platform.OS == 'ios';

export default function BHSwitch(props: React.ComponentProps<typeof Switch>) {
  return (
    <Switch
      trackColor={{
        false: ThemeColors.grey,
        true: ThemeColors.blue,
      }}
      // ios_backgroundColor={ThemeColors.blue} // This doesn't seem to work ?
      thumbTintColor={
        isIOS ? undefined : props.value ? ThemeColors.blue : ThemeColors.grey
      }
      {...props}
    />
  );
}

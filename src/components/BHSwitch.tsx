import React from 'react';
import {Switch, Platform} from 'react-native';
import ThemeColors from '../util/ThemeColors';
import {aShadeDarker} from '../util/util';

const isIOS = Platform.OS == 'ios';

export default function BHSwitch(props: React.ComponentProps<typeof Switch>) {
  return (
    <Switch
      trackColor={{
        false: ThemeColors.grey,
        true: ThemeColors.lightBlue,
      }}
      thumbColor={
        isIOS ? undefined : props.value ? ThemeColors.blue : ThemeColors.grey
      }
      {...props}
    />
  );
}

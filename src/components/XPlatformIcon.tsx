import React, {ComponentProps} from 'react';
// import { Platform } from "react-native";
import Icon from 'react-native-ionicons';

// const isIOS = Platform.OS == "ios";

interface IProps extends ComponentProps<typeof Icon> {}

export default function XPlatformIcon(props: IProps) {
  const {size, ...otherProps} = props;
  // const prefix = isIOS ? "ios-" : "md-";
  // const iconName = prefix + name;
  const iconSize = size || 28;
  return <Icon size={iconSize} {...otherProps} />;
}

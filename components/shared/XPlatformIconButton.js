// DEPRECATED

import React from "react";
import { Platform, View } from "react-native";
import IosIcon from "react-native-vector-icons/Ionicons";
import AndroidIcon from "react-native-vector-icons/MaterialIcons";
import XPlatformTouchable from "./XPlatformTouchable";

export default function XPlatformIconButton(props) {
  const {
    name,
    androidName,
    iosName,
    size,
    color,
    androidColor,
    iosColor,
    buttonStyle,
    androidButtonStyle,
    ...otherProps
  } = props;
  const params =
    Platform.OS == "ios"
      ? {
          Icon: IosIcon,
          name: name || iosName,
          color: color || iosColor,
          buttonStyle: buttonStyle
        }
      : {
          Icon: AndroidIcon,
          name: name || androidName,
          color: color || androidColor,
          buttonStyle: [buttonStyle, androidButtonStyle]
        };
  return (
    <XPlatformTouchable {...otherProps}>
      <View style={params.buttonStyle}>
        <params.Icon name={params.name} size={size} color={params.color} />
      </View>
    </XPlatformTouchable>
  );
}

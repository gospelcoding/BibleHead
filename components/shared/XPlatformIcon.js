import React from "react";
import { Platform } from "react-native";
import iosIcon from "react-native-vector-icons/Ionicons";
import androidIcon from "react-native-vector-icons/MaterialIcons";

export default function XPlatformIcon(props) {
  const { name, size, ...otherProps } = props;
  const Icon = Platform.OS == "ios" ? iosIcon : androidIcon;
  const iconSize = size || 28;
  return <Icon name={icons(name)} size={iconSize} {...otherProps} />;
}

function icons(name) {
  return Platform.select({
    ios: {
      add: "ios-add",
      eye: "ios-eye",
      replay: "ios-refresh",
      home: "ios-home",
      check: "ios-checkmark",
      pencil: "ios-create",
      x: "ios-close",
      trash: "ios-trash",
      settings: "ios-settings",
      arrowBack: "ios-arrow-back"
    },
    android: {
      add: "add",
      eye: "remove-red-eye",
      replay: "replay",
      home: "home",
      check: "check",
      pencil: "create",
      x: "close",
      trash: "delete",
      more: "more-vert",
      arrowBack: "arrow-back"
    }
  })[name];
}

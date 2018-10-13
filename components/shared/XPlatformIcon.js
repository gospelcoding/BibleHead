import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const isIOS = Platform.OS == "ios";

export default function XPlatformIcon(props) {
  const { name, size, ...otherProps } = props;
  const prefix = isIOS ? "ios-" : "md-";
  const iconName = prefix + name;
  const iconSize = size || 28;
  return <Icon name={iconName} size={iconSize} {...otherProps} />;
}

XPlatformIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number
};

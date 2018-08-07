import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import BHButton from "./BHButton";
import iosIcon from "react-native-vector-icons/Ionicons";
import androidIcon from "react-native-vector-icons/MaterialIcons";

export default function BHIconButton(props) {
  const { name, size, ...otherProps } = props;
  const iconName = icons(name);
  const iconSize = size || 28;
  const Icon = Platform.OS == "ios" ? iosIcon : androidIcon;

  return (
    <BHButton {...otherProps}>
      <Icon name={iconName} size={iconSize} />
    </BHButton>
  );
}

function icons(name) {
  return Platform.select({
    ios: {
      add: "ios-add",
      eye: "ios-eye",
      replay: "ios-refresh",
      home: "ios-home",
      check: "ios-checkmark"
    },
    android: {
      add: "add",
      eye: "remove-red-eye",
      replay: "replay",
      home: "home",
      check: "check"
    }
  })[name];
}

BHIconButton.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number
  // And props for BHButton
};

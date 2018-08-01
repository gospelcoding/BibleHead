import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from "react-native";
import PropTypes from "prop-types";

export default function XPlatformTouchable(props) {
  const androidBackground =
    Platform.OS == "ios"
      ? undefined
      : TouchableNativeFeedback.Ripple(props.rippleColor, true);
  const Touchable =
    Platform.OS == "ios" ? TouchableOpacity : TouchableNativeFeedback;
  return (
    <Touchable background={androidBackground} {...props}>
      {props.children}
    </Touchable>
  );
}

XPlatformTouchable.propTypes = {
  rippleColor: PropTypes.string,
  children: PropTypes.object.isRequired
};

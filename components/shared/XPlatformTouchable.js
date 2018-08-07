import React from "react";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import ThemeColors from "../../util/ThemeColors";
// import { aShadeDarker } from "../../util/util";

export default function XPlatformTouchable(props) {
  // For now I'm trying a hardcoded rgba(0,0,0,.32)
  // const rippleColor = props.color ? aShadeDarker(props.color) : "black";
  const borderlessRipple = !!props.borderlessRipple;

  const params = Platform.select({
    ios: {
      Touchable: props.iosHighlight ? TouchableHighlight : TouchableOpacity,
      props: {
        underlayColor: props.iosHighlight ? ThemeColors.grey : undefined
      }
    },
    android: {
      Touchable: TouchableNativeFeedback,
      props: {
        background: TouchableNativeFeedback.Ripple(
          "rgba(0, 0, 0, .32)",
          borderlessRipple
        )
      }
    }
  });
  return (
    <params.Touchable {...params.props} {...props}>
      {props.children}
    </params.Touchable>
  );
}

XPlatformTouchable.propTypes = {
  // color: PropTypes.string,
  borderlessRipple: PropTypes.bool,
  iosHighlight: PropTypes.bool,
  children: PropTypes.object.isRequired
};

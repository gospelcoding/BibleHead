// An improved Button that accepts a child element or a title
// and allows styling the button and the text
// and onPressIn/onPressOut events

// Default styles copied from the default React Native Button
// thx, fb :)

import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
import ThemeColors from "../../util/ThemeColors";
import XPlatformTouchable from "./XPlatformTouchable";
import PropTypes from "prop-types";

// const defaultButtonColor = ThemeColors.blue;

export default function BHButton(props) {
  const {
    title,
    buttonStyle,
    textStyle,
    children,
    color,
    ...otherProps
  } = props;

  let textStyles = [styles.text, textStyle];
  let buttonStyles = [styles.button, buttonStyle];

  if (color) {
    if (Platform.OS == "ios") textStyles.push({ color: color });
    else buttonStyles.push({ backgroundColor: color });
  }

  // Right now, I'm just using white to generate ripple color
  // It's more visible on my dark matte buttons
  // const androidButtonColor = color || defaultButtonColor;

  const innerElement = children ? (
    <Text style={textStyles}>{children}</Text>
  ) : (
    <Text style={textStyles}>{title.toUpperCase()}</Text>
  );

  return (
    <XPlatformTouchable /*color={"#ffffff"}*/ {...otherProps}>
      <View style={buttonStyles}>{innerElement}</View>
    </XPlatformTouchable>
  );
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      backgroundColor: ThemeColors.buttonBlue,
      elevation: 4,
      borderRadius: 2
    }
  }),
  text: Platform.select({
    ios: {
      color: ThemeColors.buttonBlue,
      textAlign: "center",
      padding: 8,
      fontSize: 18
    },
    android: {
      color: "white",
      textAlign: "center",
      padding: 8,
      fontWeight: "500"
    }
  })
});

BHButton.propTypes = {
  title: PropTypes.string,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.object,
  color: PropTypes.string
};

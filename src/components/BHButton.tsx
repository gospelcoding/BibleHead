// An improved Button that accepts a child element or a title
// and allows styling the button and the text
// and onPressIn/onPressOut events

// Default styles copied from the default React Native Button
// thx, fb :)

import React, {ComponentProps, PropsWithChildren} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
// import XPlatformTouchable from "./XPlatformTouchable";
import PropTypes from 'prop-types';
import ThemeColors from '../util/ThemeColors';

// const defaultButtonColor = ThemeColors.blue;

interface IProps
  extends PropsWithChildren<ComponentProps<typeof TouchableOpacity>> {
  title?: string;
  color?: string;
  hidden?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function BHButton(props: IProps) {
  const {
    title,
    buttonStyle,
    textStyle,
    children,
    color,
    hidden,
    ...otherProps
  } = props;

  let textStyles: StyleProp<TextStyle>[] = [styles.text, textStyle];
  let buttonStyles: StyleProp<ViewStyle>[] = [styles.button, buttonStyle];

  if (color) {
    // if (Platform.OS == "ios") textStyles.push({ color: color });
    buttonStyles.push({backgroundColor: color});
  }

  if (hidden) {
    textStyles.push({opacity: 0});
    buttonStyles.push({opacity: 0});
  }

  // Right now, I'm just using white to generate ripple color
  // It's more visible on my dark matte buttons
  // const androidButtonColor = color || defaultButtonColor;

  let theTitle = title || '';
  // theTitle = Platform.OS == "ios" ? theTitle : theTitle.toUpperCase();
  const innerElement = children ? (
    <Text style={textStyles}>{children}</Text>
  ) : (
    <Text style={textStyles}>{theTitle}</Text>
  );

  return (
    <TouchableOpacity /*color={"#ffffff"}*/ {...otherProps}>
      <View style={buttonStyles}>{innerElement}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColors.buttonBlue,
    elevation: 1,
    borderRadius: 16,
    padding: 8,
    margin: 8,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

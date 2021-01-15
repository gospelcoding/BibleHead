import React, {ComponentProps} from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import ThemeColors from '../util/ThemeColors';
import BHTouchable from './BHTouchable';
import {SvgXml} from 'react-native-svg';
import Icon from 'react-native-ionicons';
import ElevatedView from 'react-native-elevated-view';

interface IProps {
  title?: string;
  svg?: string;
  icon?: ComponentProps<typeof Icon>['name'];
  color?: 'blue' | 'red' | 'yellow' | 'green';
  size?: 'big' | 'jumbo';
  iosFixJumboIcon?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const iconSizes = {
  normal: 16,
  big: 24,
  jumbo: 36,
};

const isIos = Platform.OS == 'ios';

export default function BHButton(props: IProps) {
  const buttonStyles = [
    styles.button,
    props.hidden ? {opacity: 0} : {},
    props.size == 'big'
      ? {height: 44, borderRadius: 20}
      : props.size == 'jumbo'
      ? {height: 66, borderRadius: 32}
      : {},
  ];

  const textStyles = [
    styles.text,
    props.hidden ? {opacity: 0} : {},
    props.size ? {fontSize: props.size == 'jumbo' ? 36 : 24} : {},
  ];

  const bgColor = props.disabled
    ? ThemeColors.grey
    : props.color
    ? ThemeColors[props.color]
    : ThemeColors.lightBlue;

  const iconSize =
    props.iosFixJumboIcon && isIos ? 60 : iconSizes[props.size || 'normal'];

  return (
    <BHTouchable
      onPress={props.onPress}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      backgroundColor={bgColor}
      disabled={props.disabled}>
      {(backgroundColor) => (
        <ElevatedView
          elevation={2}
          style={[...buttonStyles, {backgroundColor}]}>
          {props.svg ? (
            <SvgXml xml={props.svg} height={iconSize} width={iconSize} />
          ) : props.icon ? (
            <Icon
              style={{alignSelf: 'center'}}
              size={iconSize}
              name={props.icon}
              color={styles.text.color}
            />
          ) : (
            <Text style={textStyles}>{props.title}</Text>
          )}
        </ElevatedView>
      )}
    </BHTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    padding: 8,
    margin: 8,
    height: 36,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: ThemeColors.white,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

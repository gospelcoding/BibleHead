import React, {PropsWithChildren, useState, ReactNode} from 'react';
import {Pressable, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {aShadeDarker} from '../util/util';

interface IProps {
  backgroundColor: string;
  onPress: () => void;
  children: (backgroundColor: string) => ReactNode;
  onPressIn?: () => void;
  onPressOut?: () => void;
  disabled?: boolean;
}

export default function BHTouchable(props: IProps) {
  const [pressed, setPressed] = useState(false);
  const backgroundColor = pressed
    ? aShadeDarker(props.backgroundColor)
    : props.backgroundColor;

  // Using TouchableWithoutFeedback because of this issue with Pressable:
  // https://github.com/facebook/react-native/issues/29376

  return (
    <TouchableWithoutFeedback
      style={styles.pressable}
      onPressIn={() => {
        setPressed(true);
        if (props.onPressIn) props.onPressIn();
      }}
      onPressOut={() => {
        setPressed(false);
        if (props.onPressOut) props.onPressOut();
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      {props.children(backgroundColor)}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 0,
    backgroundColor: '#000000',
  },
});

// import React, {PropsWithChildren, ComponentProps} from 'react';
// import {
//   TouchableOpacity,
//   Platform,
//   TouchableNativeFeedback,
// } from 'react-native';

// const isIOS = Platform.OS == 'ios';

// export default function BHTouchable(
//   props: PropsWithChildren<ComponentProps<typeof TouchableOpacity>>,
// ) {
//   const borderlessRipple = false; // could be prop if needed

//   return isIOS ? (
//     <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
//   ) : (
//     <TouchableNativeFeedback
//       {...props}
//       background={
//         Platform.Version >= 21
//           ? TouchableNativeFeedback.Ripple('rgba(0,0,0,.32', borderlessRipple)
//           : undefined
//       }>
//       {props.children}
//     </TouchableNativeFeedback>
//   );
// }

import React from "react";
import { Text, View } from "react-native";
import XPlatformTouchable from "../shared/XPlatformTouchable";

export default function PeekButton(props) {
  return (
    <XPlatformTouchable
      rippleColor="#DDDDDD"
      onPressIn={props.setPeek}
      onPressOut={props.cancelPeek}
    >
      <View>
        <Text style={{ color: "blue", fontSize: 18 }}>Peek</Text>
      </View>
    </XPlatformTouchable>
  );
}

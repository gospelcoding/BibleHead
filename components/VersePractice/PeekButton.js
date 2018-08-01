import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

export default function PeekButton(props) {
  return (
    <TouchableWithoutFeedback
      onPressIn={props.setPeek}
      onPressOut={props.cancelPeek}
    >
      <View>
        <Text style={{ color: "blue", fontSize: 18 }}>Peek</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

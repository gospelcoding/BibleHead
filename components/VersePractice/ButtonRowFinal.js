import React from "react";
import { View } from "react-native";
import BHButton from "../shared/BHButton";

export default function ButtonRowFinal(props) {
  return (
    <View style={props.style}>
      <BHButton title="Replay" onPress={props.replay} />
      <BHButton title="Home" onPress={props.goHome} />
      <BHButton title="Mark Learned" onPress={props.markLearned} />
    </View>
  );
}

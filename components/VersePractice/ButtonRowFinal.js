import React from "react";
import { View, Button } from "react-native";

export default function ButtonRowFinal(props) {
  return (
    <View style={props.style}>
      <Button title="Replay" onPress={props.replay} />
      <Button title="Home" onPress={props.goHome} />
      <Button title="Mark Learned" onPress={props.markLearned} />
    </View>
  );
}

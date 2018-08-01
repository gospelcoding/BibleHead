import React from "react";
import { View, Button } from "react-native";
import PeekButton from "./PeekButton";

export default function ButtonRowHideWords(props) {
  return (
    <View style={props.style}>
      <PeekButton setPeek={props.setPeek} cancelPeek={props.cancelPeek} />
      <Button title=">>" onPress={props.normalStep} />
      <Button title=">>>" onPress={props.bigStep} />
    </View>
  );
}

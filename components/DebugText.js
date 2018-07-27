import React from "react";
import { Text } from "react-native";

function DebugText(props) {
  return <Text>{JSON.stringify(props.object)}</Text>;
}

export default DebugText;

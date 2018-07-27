import React from "react";
import { Text, Switch, View } from "react-native";

function MultiverseCheck(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Switch value={false} onValueChange={props.setMultiverse} />
      <Text>More than one verse</Text>
    </View>
  );
}

export default MultiverseCheck;

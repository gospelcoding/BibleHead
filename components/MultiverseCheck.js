import React from "react";
import PropTypes from "prop-types";
import { Text, Switch, View } from "react-native";

export default function MultiverseCheck(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Switch value={false} onValueChange={props.setMultiverse} />
      <Text>More than one verse</Text>
    </View>
  );
}

MultiverseCheck.propTypes = {
  setMultiverse: PropTypes.func.isRequired
};

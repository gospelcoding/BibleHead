import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";

export default function ButtonRowShowWords(props) {
  return (
    <View style={props.style}>
      <Button title=">" onPress={props.normalStep} />
      <Button title=">>" onPress={props.bigStep} />
      <Button title=">|" onPress={props.stepToEnd} />
    </View>
  );
}

ButtonRowShowWords.propTypes = {
  style: PropTypes.object.isRequired,
  normalStep: PropTypes.func.isRequired,
  bigStep: PropTypes.func.isRequired,
  stepToEnd: PropTypes.func.isRequired
};

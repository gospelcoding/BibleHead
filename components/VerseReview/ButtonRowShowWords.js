import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import XPlatformIconButton from "../shared/XPlatformIconButton";
import BHButton from "../shared/BHButton";

export default function ButtonRowShowWords(props) {
  return (
    <View style={props.style}>
      <XPlatformIconButton title=">" onPress={props.normalStep} />
      <BHButton title=">>" onPress={props.bigStep} />
      <BHButton title=">|" onPress={props.stepToEnd} />
    </View>
  );
}

ButtonRowShowWords.propTypes = {
  style: PropTypes.object.isRequired,
  normalStep: PropTypes.func.isRequired,
  bigStep: PropTypes.func.isRequired,
  stepToEnd: PropTypes.func.isRequired
};

import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";
import PeekButton from "./PeekButton";
import BHButton from "../shared/BHButton";

export default function ButtonRowHideWords(props) {
  return (
    <View style={props.style}>
      <PeekButton setPeek={props.setPeek} cancelPeek={props.cancelPeek} />
      <BHButton title=">>" onPress={props.normalStep} />
      <BHButton title=">>>" onPress={props.bigStep} />
    </View>
  );
}

ButtonRowHideWords.propTypes = {
  style: PropTypes.object.isRequired,
  normalStep: PropTypes.func.isRequired,
  bigStep: PropTypes.func.isRequired,
  setPeek: PropTypes.func.isRequired,
  cancelPeek: PropTypes.func.isRequired
};

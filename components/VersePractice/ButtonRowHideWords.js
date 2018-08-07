import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";
import PeekButton from "./PeekButton";
import BHButton from "../shared/BHButton";

export default function ButtonRowHideWords(props) {
  return (
    <View style={props.style}>
      <View style={props.buttonContainerStyle}>
        <PeekButton
          step={props.step}
          setPeek={props.setPeek}
          cancelPeek={props.cancelPeek}
          buttonStyle={props.buttonStyle}
          textStyle={props.iconButtonTextStyle}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        <BHButton
          title=">>"
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.normalStep}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        <BHButton
          title=">>>"
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.bigStep}
        />
      </View>
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

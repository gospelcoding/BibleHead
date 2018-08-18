import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import BHButton from "../shared/BHButton";

export default function ButtonRowShowWords(props) {
  return (
    <View style={props.style}>
      <View style={props.buttonContainerStyle}>
        <BHButton
          title=">"
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.normalStep}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        <BHButton
          title=">>"
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.bigStep}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        <BHButton
          title=">|"
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.stepToEnd}
        />
      </View>
    </View>
  );
}

ButtonRowShowWords.propTypes = {
  style: PropTypes.object.isRequired,
  normalStep: PropTypes.func.isRequired,
  bigStep: PropTypes.func.isRequired,
  stepToEnd: PropTypes.func.isRequired
};

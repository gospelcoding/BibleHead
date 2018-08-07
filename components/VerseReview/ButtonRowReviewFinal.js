import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";
import BHButton from "../shared/BHButton";

export default function ButtonRowReviewFinal(props) {
  return (
    <View style={props.style}>
      <BHButton title="Wrong" onPress={props.reviewFailed} />
      <BHButton title="Right" onPress={props.reviewSuccess} />
    </View>
  );
}

ButtonRowReviewFinal.propTypes = {
  style: PropTypes.object.isRequired,
  reviewFailed: PropTypes.func.isRequired,
  reviewSuccess: PropTypes.func.isRequired
};

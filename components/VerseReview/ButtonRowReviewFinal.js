import React from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";

export default function ButtonRowReviewFinal(props) {
  return (
    <View style={props.style}>
      <Button title="Wrong" onPress={props.reviewFailed} />
      <Button title="Right" onPress={props.reviewSuccess} />
    </View>
  );
}

ButtonRowReviewFinal.propTypes = {
  style: PropTypes.object.isRequired,
  reviewFailed: PropTypes.func.isRequired,
  reviewSuccess: PropTypes.func.isRequired
};

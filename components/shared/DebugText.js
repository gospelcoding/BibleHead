import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

export default function DebugText(props) {
  return <Text>{JSON.stringify(props.object)}</Text>;
}

DebugText.propTypes = {
  object: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

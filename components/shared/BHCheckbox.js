import React from "react";
import PropTypes from "prop-types";
import Checkbox from "react-native-checkbox";
import ThemeColors from "../../util/ThemeColors";
import { Platform } from "react-native";

export default function BHCheckbox(props) {
  const { small, ...otherProps } = props;
  const cbSize = small ? 18 : 26;
  const fontSize = small ? 22 : 32;
  const uncheckedLabelColor = Platform.OS == "ios" ? "black" : "#666";
  return (
    <Checkbox
      checkedImage={require("./checkbox-checked-2.png")}
      uncheckedImage={require("./checkbox-unchecked.png")}
      checkboxStyle={{ height: cbSize, width: cbSize }}
      labelStyle={{
        color: props.checked ? ThemeColors.green : uncheckedLabelColor,
        fontSize: fontSize
      }}
      {...otherProps}
    />
  );
}

BHCheckbox.propTypes = {
  small: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

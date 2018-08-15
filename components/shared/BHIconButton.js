import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import BHButton from "./BHButton";
import XPlatformIcon from "./XPlatformIcon";

export default function BHIconButton(props) {
  const { name, size, ...otherProps } = props;

  return (
    <BHButton {...otherProps}>
      <XPlatformIcon name={name} size={size} />
    </BHButton>
  );
}

BHIconButton.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number
  // And props for BHButton
};

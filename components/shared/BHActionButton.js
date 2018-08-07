import React from "react";
import PropTypes from "prop-types";
import BHIconButton from "./BHIconButton";

export default function BHActionButton(props) {
  const { textStyle, buttonStyle, ...otherProps } = props;
  const abTextStyle = [
    {
      color: "#ffffff"
    },
    textStyle
  ];
  const abButtonStyle = [
    {
      backgroundColor: "transparent",
      elevation: 0
    },
    buttonStyle
  ];
  return (
    <BHIconButton
      borderlessRipple={true}
      textStyle={abTextStyle}
      buttonStyle={abButtonStyle}
      {...otherProps}
    />
  );
}

BHActionButton.propTypes = {
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  buttonStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ])
  // And props for BHIconButton & BHButton
};

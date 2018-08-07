import React from "react";
import PropTypes from "prop-types";
import BHIconButton from "../shared/BHIconButton";
import ThemeColors from "../../util/ThemeColors";

export default function PeekButton(props) {
  let { step, textStyle, buttonStyle, ...otherProps } = props;

  if (step == 0) {
    (textStyle = [textStyle, { opacity: 0 }]),
      (buttonStyle = [buttonStyle, { opacity: 0 }]);
  }

  return (
    <BHIconButton
      name="eye"
      size={36}
      color={ThemeColors.yellow}
      onPressIn={props.setPeek}
      onPressOut={props.cancelPeek}
      textStyle={textStyle}
      buttonStyle={buttonStyle}
      {...otherProps}
    />
  );
}

PeekButton.propTypes = {
  step: PropTypes.number.isRequired
  // And props for BHButton
};

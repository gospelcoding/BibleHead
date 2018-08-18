import React from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import BHIconButton from "../shared/BHIconButton";
import ThemeColors from "../../util/ThemeColors";

const isIOS = Platform.OS == "ios";

export default function ButtonRowReviewFinal(props) {
  return (
    <View style={props.style}>
      <View style={props.buttonContainerStyle}>
        <BHIconButton
          name="x"
          size={isIOS ? 60 : 36}
          color={ThemeColors.red}
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.reviewFailed}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        <BHIconButton
          name="check"
          size={isIOS ? 70 : 36}
          color={ThemeColors.buttonGreen}
          buttonStyle={props.buttonStyle}
          textStyle={props.buttonTextStyle}
          onPress={props.reviewSuccess}
        />
      </View>
    </View>
  );
}

ButtonRowReviewFinal.propTypes = {
  style: PropTypes.object.isRequired,
  reviewFailed: PropTypes.func.isRequired,
  reviewSuccess: PropTypes.func.isRequired
};

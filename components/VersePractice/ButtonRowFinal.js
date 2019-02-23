import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import BHIconButton from "../shared/BHIconButton";
import I18n from "../../i18n/i18n";
import BHCheckbox from "../shared/BHCheckbox";

export default function ButtonRowFinal(props) {
  return (
    <View>
      <BHCheckbox
        label={I18n.t("Learned")}
        checked={!!props.verseLearned}
        onChange={props.toggleLearned}
        containerStyle={styles.checkboxContainerStyle}
      />
      <View style={props.style}>
        <View style={props.buttonContainerStyle}>
          <BHIconButton
            name="refresh"
            size={36}
            onPress={props.replay}
            buttonStyle={props.buttonStyle}
            textStyle={props.iconButtonTextStyle}
          />
        </View>
        <View style={props.buttonContainerStyle}>
          <BHIconButton
            name="home"
            size={36}
            onPress={props.goHome}
            buttonStyle={props.buttonStyle}
            textStyle={props.iconButtonTextStyle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainerStyle: {
    marginHorizontal: 8,
    marginBottom: 16,
    alignSelf: "flex-end"
  }
});

ButtonRowFinal.propTypes = {
  style: PropTypes.object.isRequired,
  buttonContainerStyle: PropTypes.object.isRequired,
  buttonStyle: PropTypes.object.isRequired,
  iconButtonTextStyle: PropTypes.object.isRequired,
  buttonTextStyle: PropTypes.object.isRequired,
  replay: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
  verseLearned: PropTypes.bool,
  toggleLearned: PropTypes.func.isRequired
};

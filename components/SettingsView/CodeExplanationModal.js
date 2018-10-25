import React from "react";
import Modal from "react-native-modal";
import BHButton from "../shared/BHButton";
import { View, Text, SafeAreaView, Platform, StyleSheet } from "react-native";
import I18n from "../../i18n/i18n";
import PropTypes from "prop-types";
import CommonStyles from "../../util/CommonStyles";

export default function CodeExplanationModal(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onRequestClose={props.dismissModal}
      onBackdropPress={props.dismissModal}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.message}>
            {I18n.t("CodeExplanation", { code: props.code })}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <BHButton
            title={I18n.t("GotIt")}
            onPress={props.dismissModal}
            textStyle={styles.buttonTextStyle}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      backgroundColor: "white",
      borderRadius: 16,
      paddingHorizontal: 16,
      marginBottom: 8
    },
    android: {
      backgroundColor: "white"
    }
  }),
  buttonContainer: Platform.select({
    ios: {
      backgroundColor: "white",
      borderRadius: 16,
      paddingVertical: 10
    },
    android: {
      backgroundColor: "white",
      justifyContent: "flex-end",
      paddingRight: 16,
      paddingBottom: 8,
      flexDirection: "row"
    }
  }),
  buttonTextStyle: Platform.select({
    ios: {
      fontWeight: "600",
      fontSize: 20
    },
    android: CommonStyles.androidDialogButton.text
  }),
  buttonStyle: Platform.select({
    android: CommonStyles.androidDialogButton.button
  }),
  message: {
    fontSize: 18,
    marginVertical: 12,
    textAlign: "center"
  }
});

CodeExplanationModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  dismissModal: PropTypes.func.isRequired,
  code: PropTypes.string
};

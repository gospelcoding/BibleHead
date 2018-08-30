import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import XPlatformTouchable from "./XPlatformTouchable";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";

const isAndroid = Platform.OS == "android";

export default function UndoAlert(props) {
  let buttonText = I18n.t("Undo");
  if (isAndroid) buttonText = buttonText.toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{props.message}</Text>
      <XPlatformTouchable onPress={props.undoAction}>
        <Text style={styles.undoButton}>{buttonText}</Text>
      </XPlatformTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000000BB",
    padding: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  message: {
    color: "white",
    fontSize: 16
  },
  undoButton: {
    color: ThemeColors.iosBlue,
    fontWeight: "bold",
    fontSize: 16
  }
});

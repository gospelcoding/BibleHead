import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import BHButton from "./BHButton";
import i18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";

export default function HelpText(props) {
  return (
    !!props.text && (
      <View style={styles.container}>
        <Text style={styles.header}>{props.header}</Text>
        <Text style={styles.text}>{props.text}</Text>
        <BHButton
          onPress={props.onDismiss}
          title={i18n.t("GotIt")}
          buttonStyle={{ alignSelf: "flex-end" }}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 8,
    marginTop: 8
  },
  header: {
    color: ThemeColors.blue,
    fontWeight: "bold",
    fontSize: 24
  },
  text: {
    fontSize: 18
  }
});

HelpText.propTypes = {
  text: PropTypes.string,
  header: PropTypes.string,
  onDismiss: PropTypes.func.isRequired
};

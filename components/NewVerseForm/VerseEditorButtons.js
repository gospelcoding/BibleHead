import React from "react";
import { Button, StyleSheet, View } from "react-native";
import I18n from "../../i18n/i18n";
import PropTypes from "prop-types";

export default function VerseEditorButtons(props) {
  return props.page == "ref" ? (
    <View style={styles.buttonRow}>
      <Button
        onPress={() => {
          props.goToPage("text");
        }}
        title={I18n.t("EnterText")}
      />
    </View>
  ) : (
    <View style={styles.buttonRow}>
      <Button
        onPress={() => {
          props.goToPage("ref");
        }}
        title={I18n.t("EnterReference")}
      />
      <Button onPress={props.saveVerse} title={I18n.t("Save")} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

VerseEditorButtons.propTypes = {
  page: PropTypes.string.isRequired,
  goToPage: PropTypes.func.isRequired,
  saveVerse: PropTypes.func.isRequired
};

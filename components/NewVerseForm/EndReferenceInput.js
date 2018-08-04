import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ChapterVerseInput from "./ChapterVerseInput";
import I18n from "../../i18n/i18n";

export default function EndReferenceInput(props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.toText}>{"    " + I18n.t("to")}</Text>
      </View>
      <ChapterVerseInput
        chapter={props.verse.endChapter}
        verse={props.verse.endVerse}
        updateChapter={c => {
          props.updateVerse({ endChapter: c });
        }}
        updateVerse={v => {
          props.updateVerse({ endVerse: v });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toText: {
    fontSize: 30
  }
});

EndReferenceInput.propTypes = {
  verse: PropTypes.shape({
    endChapter: PropTypes.number.isRequired,
    endVerse: PropTypes.number.isRequired
  }),
  updateVerse: PropTypes.func.isRequired
};

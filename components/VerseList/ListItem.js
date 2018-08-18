import React from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import Verse from "../../models/Verse";
import LearnedToggleButton from "./LearnedToggleButton";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";
import BHButton from "../shared/BHButton";

export default function ListItem(props) {
  return (
    <View style={styles.item}>
      <XPlatformTouchable
        onPress={() => {
          props.toggleSelect(props.verse);
        }}
      >
        <View style={styles.headerView}>
          <Text
            style={props.selected ? styles.selectedRefText : styles.refText}
          >
            {Verse.refText(props.verse)}
          </Text>
        </View>
      </XPlatformTouchable>
      {props.selected && (
        <View style={styles.selectedView}>
          <Text style={styles.verseText}>{props.verse.text}</Text>
          <View style={styles.buttonRow}>
            <LearnedToggleButton
              verse={props.verse}
              updateVerse={props.updateVerse}
              toggleSelect={props.toggleSelect}
            />
            <BHButton
              onPress={() => {
                props.practiceVerse(props.verse);
              }}
              title={I18n.t("Practice")}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginBottom: Platform.OS == "ios" ? 1 : 2
  },
  headerView: {
    padding: 8
  },
  selectedView: {
    padding: 8
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  refText: {
    fontSize: 24,
    color: "black"
  },
  selectedRefText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold"
  },
  verseText: {
    fontSize: 18
  }
});

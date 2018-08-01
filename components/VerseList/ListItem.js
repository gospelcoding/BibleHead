import React from "react";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Button
} from "react-native";
import Verse from "../../models/Verse";
import LearnedToggleButton from "./LearnedToggleButton";

export default function ListItem(props) {
  return (
    <View style={styles.item}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.toggleSelect(props.verse);
        }}
      >
        <View>
          <Text style={styles.refText}>{Verse.refText(props.verse)}</Text>
        </View>
      </TouchableWithoutFeedback>
      {props.selected && (
        <View>
          {props.verse.text && <Text>{props.verse.text}</Text>}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <LearnedToggleButton
              verse={props.verse}
              updateVerse={props.updateVerse}
              toggleSelect={props.toggleSelect}
            />
            <Button
              onPress={() => {
                props.practiceVerse(props.verse);
              }}
              title="Practice"
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
    padding: 6
  },
  refText: {
    fontSize: 24,
    color: "black"
  }
});

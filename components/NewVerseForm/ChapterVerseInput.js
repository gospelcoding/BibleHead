import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Picker } from "react-native";
import { intArray } from "../../util/util";

const chapterNumbers = intArray(150);
const verseNumbers = intArray(200);

export default function ChapterVerseInput(props) {
  return (
    <View style={styles.chapterVerseInput}>
      <Picker
        style={styles.numberPicker}
        selectedValue={props.chapter}
        onValueChange={props.updateChapter}
        itemStyle={styles.pickerItem}
      >
        {chapterNumbers.map(num => {
          return (
            <Picker.Item
              key={num.toString()}
              label={num.toString()}
              value={num}
            />
          );
        })}
      </Picker>
      <Text style={styles.colon}> : </Text>
      <Picker
        style={styles.numberPicker}
        selectedValue={props.verse}
        onValueChange={props.updateVerse}
      >
        {verseNumbers.map(num => (
          <Picker.Item
            key={num.toString()}
            label={num.toString()}
            value={num}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  chapterVerseInput: {
    flexDirection: "row",
    alignItems: "center"
  },
  numberPicker: {
    width: 80
  },
  pickerItem: {},
  colon: {
    fontSize: 30
  }
});

ChapterVerseInput.propTypes = {
  validChapter: PropTypes.bool,
  validVerse: PropTypes.bool,
  chapter: PropTypes.number,
  verse: PropTypes.number,
  updateChapter: PropTypes.func.isRequired,
  updateVerse: PropTypes.func.isRequired
};

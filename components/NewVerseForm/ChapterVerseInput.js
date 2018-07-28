import React from "react";
import PropTypes from "prop-types";
import { View, TextInput, Text } from "react-native";

export default function ChapterVerseInput(props) {
  let chapterTextStyle = props.validChapter
    ? { color: "black" }
    : { color: "red" };
  let verseTextStyle = props.validVerse ? { color: "black" } : { color: "red" };
  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        value={String(props.chapter)}
        onChangeText={text => {
          props.updateChapter(text);
        }}
        keyboardType="numeric"
        maxLength={3}
        style={chapterTextStyle}
      />
      <Text> : </Text>
      <TextInput
        value={String(props.verse)}
        onChangeText={text => {
          props.updateVerse(text);
        }}
        keyboardType="numeric"
        maxLength={3}
        style={verseTextStyle}
      />
    </View>
  );
}

ChapterVerseInput.propTypes = {
  validChapter: PropTypes.bool,
  validVerse: PropTypes.bool,
  chapter: PropTypes.string,
  verse: PropTypes.string,
  updateChapter: PropTypes.func.isRequired,
  updateVerse: PropTypes.func.isRequired
};

import React from "react";
import { View, TextInput, Text } from "react-native";
import { isValidInteger } from "../util/util";

function isValidChapter(chapterStr) {
  return isValidInteger(chapterStr, { min: 1, max: 150 });
}

function isValidVerse(verseStr) {
  return isValidInteger(verseStr, { min: 1, max: 200 });
}

export default class ChapterVerseInput extends React.PureComponent {
  render() {
    let chapterTextStyle = isValidChapter(this.props.chapter)
      ? { color: "black" }
      : { color: "red" };
    let verseTextStyle = isValidVerse(this.props.verse)
      ? { color: "black" }
      : { color: "red" };
    return (
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={String(this.props.chapter)}
          onChangeText={text => {
            this.props.updateChapter(text);
          }}
          keyboardType="numeric"
          maxLength={3}
          style={chapterTextStyle}
        />
        <Text> : </Text>
        <TextInput
          value={String(this.props.verse)}
          onChangeText={text => {
            this.props.updateVerse(text);
          }}
          keyboardType="numeric"
          maxLength={3}
          style={verseTextStyle}
        />
      </View>
    );
  }
}

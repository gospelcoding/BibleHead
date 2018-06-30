import React from "react";
import { View, TextInput, Text } from "react-native";

function isValidChapter(chapter) {
  if (chapter < 1 || chapter > 150) return false;
  return true;
}

function isValidVerse(verse) {
  if (verse < 1 || verse > 200) return false;
  return true;
}

function numberize(text) {
  if (text === null || text === "") return "";
  return parseInt(text);
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
            this.props.updateChapter(numberize(text));
          }}
          keyboardType="numeric"
          maxLength={3}
          style={chapterTextStyle}
        />
        <Text> : </Text>
        <TextInput
          value={String(this.props.verse)}
          onChangeText={text => {
            this.props.updateVerse(numberize(text));
          }}
          keyboardType="numeric"
          maxLength={3}
          style={verseTextStyle}
        />
      </View>
    );
  }
}

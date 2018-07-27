import React from "react";
import { View, TextInput, Text } from "react-native";

export default class ChapterVerseInput extends React.PureComponent {
  render() {
    let chapterTextStyle = this.props.validChapter
      ? { color: "black" }
      : { color: "red" };
    let verseTextStyle = this.props.validVerse
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

import React from "react";
import { View, Text, TextInput, Picker } from "react-native";
import ChapterVerseInput from "./ChapterVerseInput";

class NewVerseForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      book: "Genesis",
      startChapter: "1",
      startVerse: "1"
    };
  }

  render() {
    const books = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"];
    return (
      <View>
        <Text style={{ paddingTop: 40 }}>{JSON.stringify(this.state)}</Text>
        <TextInput placeholder="Paste or type verse text here." />
        <Picker
          selectedValue={this.state.book}
          onValueChange={value => {
            this.setState({ book: value });
          }}
        >
          {books.map(book => {
            return <Picker.Item key={book} label={book} value={book} />;
          })}
        </Picker>
        <ChapterVerseInput
          chapter={this.state.startChapter}
          verse={this.state.startVerse}
          updateChapter={c => {
            this.setState({ startChapter: c });
          }}
          updateVerse={v => {
            this.setState({ startVerse: v });
          }}
        />
      </View>
    );
  }
}

export default NewVerseForm;

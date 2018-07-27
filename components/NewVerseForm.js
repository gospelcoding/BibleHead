import React from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  SafeAreaView,
  StyleSheet
} from "react-native";
import ChapterVerseInput from "./ChapterVerseInput";
import EndReferenceInput from "./EndReferenceInput";
import DebugText from "./DebugText";
import ReferenceInput from "./ReferenceInput";

class NewVerseForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      book: "Genesis",
      startChapter: "1",
      startVerse: "1",
      multiverse: false,
      endChapter: "1",
      endVerse: "2"
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          style={styles.verseTextInput}
          placeholder="Paste or type verse text here."
        />
        <ReferenceInput
          book={this.state.book}
          startChapter={this.state.startChapter}
          startVerse={this.state.startVerse}
          endChapter={this.state.endChapter}
          endVerse={this.state.endVerse}
          multiverse={this.state.multiverse}
          updateState={newState => {
            this.setState(newState);
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  verseTextInput: {
    flex: 1
  }
});

export default NewVerseForm;

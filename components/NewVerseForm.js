import React from "react";
import { TextInput, SafeAreaView, StyleSheet } from "react-native";
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
      endVerse: "2",
      verseText: ""
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
        <TextInput
          style={styles.verseTextInput}
          placeholder="Paste or type verse text here."
          multiline={true}
          value={this.state.verseText}
          onChangeText={text => {
            this.setState({ verseText: text });
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

import React from "react";
import { TextInput, SafeAreaView, StyleSheet, Button } from "react-native";
import DebugText from "./DebugText";
import ReferenceInput from "./ReferenceInput";
import VerseStorage from "../models/VerseStorage";
import { newVerse } from "../models/Verse";

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

  componentDidMount() {
    VerseStorage.getVerseIndex().then(vindex => {
      this.setState({ vindex: vindex });
    });
  }

  onSaveButton = () => {
    const verse = newVerse(
      this.state.verseText,
      this.state.book,
      this.state.startChapter,
      this.state.startVerse,
      this.state.multiverse && this.state.endChapter,
      this.state.multiverse && this.state.endVerse
    );
    VerseStorage.createVerse(verse).then(() => {
      VerseStorage.getVerseIndex().then(vindex => {
        this.setState({ vindex: vindex });
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <DebugText object={this.state.vindex} />
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
        <Button onPress={this.onSaveButton} title="Save" />
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

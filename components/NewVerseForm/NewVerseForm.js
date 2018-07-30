import React from "react";
import { TextInput, SafeAreaView, StyleSheet, Button } from "react-native";
import ReferenceInput from "./ReferenceInput";
import VerseStorage from "../../models/VerseStorage";
import Verse from "../../models/Verse";
import BibleBook from "../../models/BibleBook";

export default class NewVerseForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookId: 0,
      startChapter: "1",
      startVerse: "1",
      multiverse: false,
      endChapter: "1",
      endVerse: "2",
      verseText: ""
    };
  }

  onSaveButton = () => {
    const verse = Verse.newVerse(
      this.state.verseText,
      this.state.bookId,
      BibleBook.books[this.state.bookId],
      parseInt(this.state.startChapter),
      parseInt(this.state.startVerse),
      this.state.multiverse && parseInt(this.state.endChapter),
      this.state.multiverse && parseInt(this.state.endVerse)
    );
    VerseStorage.createVerse(verse).then(() => {
      this.props.navigation.goBack();
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ReferenceInput
          bookId={this.state.bookId}
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

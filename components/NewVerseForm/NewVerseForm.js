import React from "react";
import { TextInput, SafeAreaView, StyleSheet, View } from "react-native";
import ReferenceInput from "./ReferenceInput";
import Verse from "../../models/Verse";
import BibleBook from "../../models/BibleBook";
import I18n from "../../i18n/i18n";
import update from "immutability-helper";
import VerseEditorButtons from "./VerseEditorButtons";

export default class NewVerseForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: "ref",
      verse: {
        bookId: 0,
        startChapter: 1,
        startVerse: 1,
        endChapter: 1,
        endVerse: 2,
        verseText: ""
      }
    };
  }

  updateVerse = mergeVerse => {
    this.setState(prevState => ({
      verse: update(prevState.verse, { $merge: mergeVerse })
    }));
  };

  goToPage = page => {
    this.setState({ page: page });
  };

  saveVerse = () => {
    console.warn("Save Verse is not yet implemented!");
  };

  // onSaveButton = () => {
  //   const verse = Verse.newVerse(
  //     this.state.verseText,
  //     this.state.bookId,
  //     BibleBook.books[this.state.bookId],
  //     parseInt(this.state.startChapter),
  //     parseInt(this.state.startVerse),
  //     this.state.multiverse && parseInt(this.state.endChapter),
  //     this.state.multiverse && parseInt(this.state.endVerse)
  //   );
  //   const addVerse = this.props.navigation.getParam("addVerse");
  //   addVerse(verse);
  //   this.props.navigation.goBack();
  // };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.page == "ref" ? (
            <ReferenceInput
              verse={this.state.verse}
              updateVerse={this.updateVerse}
            />
          ) : (
            <TextInput
              style={styles.verseTextInput}
              placeholder={I18n.t("VerseTextInputHint")}
              multiline={true}
              value={this.state.verseText}
              onChangeText={text => {
                this.setState({ verseText: text });
              }}
            />
          )}
        </View>
        <VerseEditorButtons
          page={this.state.page}
          goToPage={this.goToPage}
          saveVerse={this.saveVerse}
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

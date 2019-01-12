import React from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import I18n from "../../i18n/i18n";
import Verse from "../../models/Verse";
import update from "immutability-helper";
import ThemeColors from "../../util/ThemeColors";
import { intArray } from "../../util/util";
import PickerModal from "../shared/PickerModal";
import { BHHeaderButtons, Item } from "../shared/BHHeaderButtons";

const isAndroid = Platform.OS == "android";

export default class TextEntry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      verse: props.navigation.getParam("verse")
    };
    props.navigation.setParams({
      clickSave: this.saveVerse,
      editReference: this.editReference
    });
  }

  editReference = option => {
    if (option == "RemoveEndVerse")
      this.updateVerse({ endVerse: null, endChapter: null });
    else this.setState(this.modalState(option));
  };

  modalState = whichModal => {
    switch (whichModal) {
      case "ChangeStartChapter":
        return {
          modalData: intArray(1, 150),
          onModalSelect: c => {
            this.updateVerse({ startChapter: c });
          }
        };
      case "ChangeStartVerse":
        return {
          modalData: intArray(1, 200),
          onModalSelect: v => {
            this.updateVerse({ startVerse: v });
          }
        };
      case "AddEndVerse":
      case "ChangeEndVerse":
        return {
          modalData: this.endVerseOptions(),
          onModalSelect: endRef => {
            const colon = endRef.indexOf(":");
            this.updateVerse({
              endChapter: parseInt(endRef.slice(0, colon)),
              endVerse: parseInt(endRef.slice(colon + 1))
            });
          }
        };
    }
  };

  endVerseOptions = () => {
    const chapter = this.state.verse.startChapter;
    return intArray(this.state.verse.startVerse + 1, 200)
      .map(v => this.refStr(chapter, v))
      .concat(intArray(1, 200).map(v => this.refStr(chapter + 1, v)));
  };

  refStr = (c, v) => `${c}:${v}`;

  updateVerse = mergeVerse => {
    this.setState(prevState => {
      const newVerse = update(prevState.verse, { $merge: mergeVerse });
      this.props.navigation.setParams({
        verse: newVerse
      });
      return {
        verse: newVerse
      };
    });
  };

  saveVerse = () => {
    const saveVerse = this.props.navigation.getParam("saveVerse");
    saveVerse(this.state.verse);
    this.props.navigation.navigate("VerseList");
  };

  static navigationOptions = ({ navigation }) => {
    const verse = navigation.getParam("verse");
    return {
      title: Verse.refText(verse),
      headerRight: !!verse.text && (
        <BHHeaderButtons>
          <Item
            title="save"
            iconName="checkmark"
            iconSize={isAndroid ? undefined : 36}
            onPress={navigation.getParam("clickSave")}
          />
          {verseRefMenuOptions(verse).map(option => (
            <Item
              key={option}
              title={I18n.t(option)}
              show="never"
              onPress={() => navigation.getParam("editReference")(option)}
            />
          ))}
        </BHHeaderButtons>
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <PickerModal
          isVisible={!!this.state.modalData}
          data={this.state.modalData}
          itemSelected={this.state.onModalSelect}
          dismissModal={() => {
            this.setState({ modalData: undefined, onModalSelect: undefined });
          }}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={isAndroid ? undefined : "padding"}
          enabled
        >
          <TextInput
            style={styles.textInput}
            placeholder={I18n.t("VerseTextInputHint")}
            value={this.state.verse.text}
            multiline
            autoFocus
            onChangeText={text => {
              this.updateVerse({ text: text });
            }}
          />
          {!isAndroid && <View style={{ height: 60 }} />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

function verseRefMenuOptions(verse) {
  return verse.endChapter
    ? [
        "ChangeStartChapter",
        "ChangeStartVerse",
        "ChangeEndVerse",
        "RemoveEndVerse"
      ]
    : ["ChangeStartChapter", "ChangeStartVerse", "AddEndVerse"];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isAndroid ? ThemeColors.grey : "white"
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 18,
    padding: 8,
    margin: isAndroid ? 8 : 0,
    elevation: isAndroid ? 4 : 0
  }
});

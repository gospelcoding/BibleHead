import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import CommonStyles from "../../util/CommonStyles";
import I18n from "../../i18n/i18n";
import Verse from "../../models/Verse";
import update from "immutability-helper";
import BHButton from "../shared/BHButton";
import ThemeColors from "../../util/ThemeColors";
import BHModalDropdown from "../shared/BHModalDropdown";
import XPlatformIcon from "../shared/XPlatformIcon";
import { intArray } from "../../util/util";
import PickerModal from "../shared/PickerModal";
import BHActionButton from "../shared/BHActionButton";

const isAndroid = Platform.OS == "android";

export default class TextEntry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      verse: props.navigation.getParam("verse")
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: Verse.refText(this.state.verse),
      verseHasText: !!this.state.verse.text,
      clickSave: this.saveVerse
    });
  }

  showModal = whichModal => {
    this.setState(this.modalState(whichModal));
  };

  removeEndVerse = () => {
    this.updateVerse({ endVerse: null, endChapter: null });
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

  verseRefMenuOptions = () => {
    return this.state.verse.endChapter
      ? [
          "ChangeStartChapter",
          "ChangeStartVerse",
          "ChangeEndVerse",
          "RemoveEndVerse"
        ]
      : ["ChangeStartChapter", "ChangeStartVerse", "AddEndVerse"];
  };

  updateVerse = mergeVerse => {
    this.setState(prevState => {
      const newVerse = update(prevState.verse, { $merge: mergeVerse });
      this.props.navigation.setParams({
        title: Verse.refText(newVerse),
        verseHasText: !!newVerse.text
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
    return {
      title: navigation.getParam("title", ""),
      headerRight: navigation.getParam("verseHasText") && (
        <BHActionButton
          name="checkmark"
          color="white"
          onPress={navigation.getParam("clickSave")}
        />
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <PickerModal
          visible={!!this.state.modalData}
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.refHeader}>
              {Verse.refText(this.state.verse)}
            </Text>
            <BHModalDropdown
              style={{ margin: 8 }}
              dropdownStyle={{
                elevation: 8
              }}
              options={this.verseRefMenuOptions()}
              renderRow={option => (
                <Text style={styles.menuOption}>{I18n.t(option)}</Text>
              )}
              onSelect={(index, value) => {
                if (value == "RemoveEndVerse") this.removeEndVerse();
                else this.showModal(value);
              }}
            >
              <XPlatformIcon name="create" color={ThemeColors.yellow} />
            </BHModalDropdown>
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isAndroid ? ThemeColors.grey : "white"
  },
  refHeader: {
    fontSize: 24,
    padding: 8,
    color: "black"
  },
  textInput: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 18,
    padding: 8,
    margin: isAndroid ? 8 : 0,
    elevation: isAndroid ? 4 : 0
  },
  menuOption: {
    fontSize: 18,
    padding: 8
  }
});

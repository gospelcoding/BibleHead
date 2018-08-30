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
import PickerModal from "./PickerModal";

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
      showModal: whichModal => {
        this.setState(this.modalState(whichModal));
      },
      removeEndVerse: () => {
        this.updateVerse({ endVerse: null, endChapter: null });
      },
      verseRefMenuOptions: this.verseRefMenuOptions
    });
  }

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
        title: Verse.refText(newVerse)
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
    const verseRefMenuOptions = navigation.getParam("verseRefMenuOptions");
    const menuOptions = verseRefMenuOptions ? verseRefMenuOptions() : [];
    return {
      title:
        navigation.getParam("title") ||
        Verse.refText(navigation.getParam("verse")),
      headerRight: (
        <BHModalDropdown
          style={{ margin: 8 }}
          dropdownStyle={{
            /*height: 41.5 * menuOptions.length,*/ elevation: 8
          }}
          options={menuOptions}
          renderRow={option => (
            <Text style={styles.menuOption}>{I18n.t(option)}</Text>
          )}
          onSelect={(index, value) => {
            if (value == "RemoveEndVerse")
              navigation.getParam("removeEndVerse")();
            else navigation.getParam("showModal")(value);
          }}
        >
          <XPlatformIcon name="pencil" color="white" />
        </BHModalDropdown>
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
          <TextInput
            style={styles.textInput}
            placeholder={I18n.t("VerseTextInputHint")}
            multiline={true}
            value={this.state.verse.text}
            onChangeText={text => {
              this.updateVerse({ text: text });
            }}
          />
          {!!this.state.verse.text && (
            <View style={styles.buttonContainer}>
              <BHButton
                title={I18n.t("Save")}
                onPress={this.saveVerse}
                color={
                  isAndroid ? ThemeColors.buttonGreen : ThemeColors.buttonBlue
                }
              />
            </View>
          )}
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
  textInput: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 18,
    padding: 8,
    margin: isAndroid ? 8 : 0,
    elevation: isAndroid ? 4 : 0
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
    paddingTop: isAndroid ? 0 : 8
  },
  menuOption: {
    fontSize: 18,
    padding: 8
  }
});

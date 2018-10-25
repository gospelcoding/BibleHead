import React from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";
import BHButton from "../shared/BHButton";
import Verse from "../../models/Verse";
import Backup from "../../util/Backups";
import VerseStorage from "../../models/VerseStorage";
import CommonStyles from "../../util/CommonStyles";
import ThemeColors from "../../util/ThemeColors";

const isIOS = Platform.OS == "ios";
const states = {
  codeEntry: 0,
  working: 1,
  versesDisplay: 2
};

export default class RestoreBackupModal extends React.PureComponent {
  state = {
    code: "",
    verses: null,
    state: states.codeEntry
  };

  getVerses = async () => {
    this.setState({ errorMessage: undefined, state: states.working });
    try {
      const verses = await Backup.restoreBackup(this.state.code);
      this.setState({ verses: verses, state: states.versesDisplay });
    } catch (error) {
      this.setState({ errorMessage: error, state: states.codeEntry });
    }
  };

  addVerses = async () => {
    this.setState({ state: states.working });
    for (let verse of this.state.verses) {
      await VerseStorage.createVerse(verse);
    }
    this.props.reloadVerses();
    this.props.dismissModal();
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onRequestClose={this.props.dismissModal}
        onBackdropPress={this.props.dismissModal}
      >
        <SafeAreaView style={{ flexShrink: 1 }}>
          <KeyboardAvoidingView
            style={[{ flexShrink: 1 }, isIOS ? { marginBottom: 40 } : {}]}
          >
            <View style={styles.mainContainer}>
              {this.state.state == states.working && (
                <ActivityIndicator style={styles.spinner} />
              )}
              {this.state.state == states.codeEntry && (
                <View>
                  <TextInput
                    value={this.state.code}
                    placeholder={I18n.t("Code")}
                    onChangeText={value => this.setState({ code: value })}
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize={"characters"}
                    style={styles.codeText}
                  />
                  {this.state.errorMessage && (
                    <Text style={styles.errorText}>
                      {I18n.t(this.state.errorMessage)}
                    </Text>
                  )}
                  {isIOS &&
                    this.state.code.length > 0 && (
                      <BHButton
                        title={I18n.t("GetVerses")}
                        onPress={this.getVerses}
                        textStyle={styles.buttonTextStyle}
                        buttonStyle={styles.buttonStyle}
                      />
                    )}
                </View>
              )}
              {this.state.state == states.versesDisplay && (
                <View style={{ flexShrink: 1 }}>
                  <FlatList
                    style={styles.list}
                    data={this.state.verses}
                    keyExtractor={verse => verse.id.toString()}
                    renderItem={({ item }) => {
                      return (
                        <Text style={styles.verseRef}>
                          {Verse.refText(item)}
                        </Text>
                      );
                    }}
                  />
                  {isIOS && (
                    <BHButton
                      title={I18n.t("AddVerses")}
                      onPress={this.addVerses}
                      textStyle={styles.buttonTextStyle}
                      buttonStyle={styles.buttonStyle}
                    />
                  )}
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <BHButton
                title={I18n.t("Cancel")}
                onPress={this.props.dismissModal}
                textStyle={styles.buttonTextStyle}
                buttonStyle={styles.buttonStyle}
              />
              {!isIOS &&
                this.state.state == states.codeEntry &&
                this.state.code.length > 0 && (
                  <BHButton
                    title={I18n.t("GetVerses")}
                    onPress={this.getVerses}
                    textStyle={styles.buttonTextStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                )}
              {!isIOS &&
                this.state.state == states.versesDisplay && (
                  <BHButton
                    title={I18n.t("AddVerses")}
                    onPress={this.addVerses}
                    textStyle={styles.buttonTextStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                )}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: Platform.select({
    ios: {
      backgroundColor: "white",
      borderRadius: 16,
      paddingHorizontal: 16,
      marginBottom: 8,
      flexShrink: 1
    },
    android: {
      backgroundColor: "white",
      flexShrink: 1
    }
  }),
  buttonContainer: Platform.select({
    ios: {
      backgroundColor: "white",
      borderRadius: 16,
      paddingVertical: 10
    },
    android: {
      backgroundColor: "white",
      justifyContent: "flex-end",
      paddingRight: 16,
      paddingBottom: 8,
      flexDirection: "row"
    }
  }),
  buttonTextStyle: Platform.select({
    ios: {
      fontWeight: "600",
      fontSize: 20
    },
    android: CommonStyles.androidDialogButton.text
  }),
  buttonStyle: Platform.select({
    android: CommonStyles.androidDialogButton.button
  }),
  codeText: {
    fontSize: 24,
    marginVertical: 12,
    textAlign: "center"
  },
  list: {
    marginTop: 16,
    marginHorizontal: 16
  },
  verseRef: {
    fontSize: 16
  },
  errorText: {
    color: ThemeColors.red,
    fontSize: 16,
    padding: 8
  },
  spinner: {
    paddingVertical: 16
  }
});

RestoreBackupModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  dismissModal: PropTypes.func.isRequired,
  reloadVerses: PropTypes.func.isRequired
};

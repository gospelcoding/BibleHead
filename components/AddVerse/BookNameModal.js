import React from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";
import BHButton from "../shared/BHButton";
import CommonStyles from "../../util/CommonStyles";
import ThemeColors from "../../util/ThemeColors";

const isIOS = Platform.OS == "ios";

export default class BookNameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.verse.bookName
    };
  }

  save = () => {
    if (this.state.name.length > 0) {
      this.props.updateName(this.state.name);
      this.props.dismissModal();
    }
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
              <View>
                <Text style={styles.heading}>{I18n.t("BookName")}</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={value => this.setState({ name: value })}
                  autoFocus
                  autoCorrect={false}
                  enablesReturnKeyAutomatically
                  onSubmitEditing={this.save}
                  returnKeyType="done"
                  underlineColorAndroid={ThemeColors.yellow}
                />
                {isIOS && this.state.name.length > 0 && (
                  <BHButton
                    title={I18n.t("Save")}
                    onPress={this.save}
                    textStyle={styles.buttonTextStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <BHButton
                  title={I18n.t("Cancel")}
                  onPress={this.props.dismissModal}
                  textStyle={styles.buttonTextStyle}
                  buttonStyle={styles.buttonStyle}
                />
                {!isIOS && this.state.name.length > 0 && (
                  <BHButton
                    title={I18n.t("Save")}
                    onPress={this.save}
                    textStyle={styles.buttonTextStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                )}
              </View>
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
  input: {
    fontSize: 24,
    marginVertical: 12,
    marginHorizontal: 8
  },
  heading: {
    color: "black",
    fontSize: 24,
    marginVertical: 12,
    fontWeight: "bold",
    marginHorizontal: 8
  }
});

BookNameModal.propTypes = {
  verse: PropTypes.object.isRequired,
  updateName: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  dismissModal: PropTypes.func.isRequired
};

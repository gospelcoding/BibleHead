import React from "react";
import { SafeAreaView, StyleSheet, Text, Platform } from "react-native";
import PropTypes from "prop-types";
import ShowWordsGame from "./ShowWordsGame";
import Verse from "../../models/Verse";
import I18n from "../../i18n/i18n";
import CommonStyles from "../../util/CommonStyles";

// const isIOS = Platform.OS == "ios";

export default class VerseReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      splitIndex: 0
    };
  }

  verseNumber = () => {
    return this.props.navigation.getParam("verseNumber", 0);
  };

  nextVerse = () => {
    const nextVerseNumber = this.verseNumber() + 1;
    const verses = this.props.navigation.getParam("verses");
    if (nextVerseNumber == verses.length) {
      this.props.navigation.navigate("VerseList");
    } else {
      let params = this.props.navigation.state.params;
      params.verseNumber = nextVerseNumber;
      this.props.navigation.push("VerseReview", params);
    }
  };

  setSplitIndex = splitIndex => {
    this.setState({ splitIndex: splitIndex });
  };

  static navigationOptions = ({ navigation }) => {
    const verses = navigation.getParam("verses");
    const verseNumber = navigation.getParam("verseNumber", 0);
    return {
      title: Verse.refText(verses[verseNumber]),
      headerRight: (
        <Text style={styles.headerRight}>
          {I18n.t("xOfY", { x: verseNumber + 1, y: verses.length })}
        </Text>
      )
    };
  };

  render() {
    const verse = this.props.navigation.getParam("verses")[this.verseNumber()];
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <ShowWordsGame
          verse={verse}
          splitIndex={this.state.splitIndex}
          setSplitIndex={this.setSplitIndex}
          nextVerse={this.nextVerse}
          updateVerse={this.props.navigation.getParam("updateVerse")}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {
    color: "white",
    fontSize: 16,
    padding: 8
  }
});

VerseReview.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired
  }).isRequired
};

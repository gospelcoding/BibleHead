import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import ShowWordsGame from "./ShowWordsGame";
import Verse from "../../models/Verse";
import I18n from "../../i18n/i18n";
import CommonStyles from "../../util/CommonStyles";
import BHActionButton from "../shared/BHActionButton";

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
    const verses = this.props.navigation.getParam("reviewVerses");
    if (nextVerseNumber == verses.length) {
      this.endOfReviewVerses();
    } else {
      let params = this.props.navigation.state.params;
      params.verseNumber = nextVerseNumber;
      this.props.navigation.push("VerseReview", params);
    }
  };

  endOfReviewVerses = () => {
    if (this.props.navigation.getParam("learningVerse"))
      this.props.navigation.navigate(
        "VersePractice",
        this.props.navigation.state.params
      );
    else this.props.navigation.navigate("VerseListScreen");
  };

  setSplitIndex = splitIndex => {
    this.setState({ splitIndex: splitIndex });
  };

  static navigationOptions = ({ navigation }) => {
    const verses = navigation.getParam("reviewVerses");
    const verseNumber = navigation.getParam("verseNumber", 0);
    return {
      title: Verse.refText(verses[verseNumber]),
      headerRight: (
        <Text style={styles.headerRight}>{progressText(navigation)}</Text>
      ),
      headerLeft: (
        <BHActionButton
          name="arrow-back"
          onPress={() => {
            navigation.navigate("VerseListScreen");
          }}
        />
      )
    };
  };

  render() {
    const verse = this.props.navigation.getParam("reviewVerses")[
      this.verseNumber()
    ];
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <ShowWordsGame
          verse={verse}
          verseText={reviewText(verse)}
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
    getParam: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};

function reviewText(verse) {
  return verse.learned
    ? verse.text
    : verse.text.slice(0, verse.splitIndices[verse.currentSplit]);
}

function progressText(navigation) {
  const verseNumber = navigation.getParam("verseNumber", 0) + 1;
  let verseCount = navigation.getParam("reviewVerses").length;
  if (navigation.getParam("learningVerse")) verseCount += 1;
  return I18n.t("xOfY", { x: verseNumber, y: verseCount });
}

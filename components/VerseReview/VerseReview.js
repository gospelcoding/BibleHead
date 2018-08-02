import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import ShowWordsGame from "./ShowWordsGame";
import Verse from "../../models/Verse";

export default class VerseReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      verseNumber: 0,
      splitIndex: 0
    };
  }

  static navigationOptions = ({ navigation }) => {
    const verses = navigation.getParam("verses");
    return {
      title: navigation.getParam("title", Verse.refText(verses[0])),
      headerRight: (
        <Text>
          {1 + navigation.getParam("verseNumber", 0)} of {verses.length}
        </Text>
      )
    };
  };

  nextVerse = () => {
    this.setState((prevState, props) => {
      const nextVerseNumber = prevState.verseNumber + 1;
      const verses = props.navigation.getParam("verses");
      if (nextVerseNumber == verses.length) {
        props.navigation.goBack();
      } else {
        props.navigation.setParams({
          title: Verse.refText(verses[nextVerseNumber]),
          verseNumber: nextVerseNumber
        });
        return { verseNumber: nextVerseNumber, splitIndex: 0 };
      }
    });
  };

  setSplitIndex = splitIndex => {
    this.setState({ splitIndex: splitIndex });
  };

  render() {
    const verse = this.props.navigation.getParam("verses")[
      this.state.verseNumber
    ];
    return (
      <SafeAreaView style={{ flex: 1 }}>
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

VerseReview.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired
  }).isRequired
};

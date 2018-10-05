import React from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import PropTypes from "prop-types";
import ButtonRow from "../VersePractice/ButtonRow";
import Verse from "../../models/Verse";

const isIOS = Platform.OS == "ios";

function gameText(props) {
  return props.verseText.slice(0, props.splitIndex);
}

function remainderText(props) {
  return props.verseText.slice(props.splitIndex);
}

function nextSplitIndex(pattern, props) {
  const match = pattern.exec(remainderText(props));
  return match === null
    ? props.verseText.length
    : match[0].length + match.index + props.splitIndex;
}

export default function showWordsGame(props) {
  const scroll = () => {
    setTimeout(() => {
      this.scrollView && this.scrollView.scrollToEnd();
    }, 50);
  };

  const normalStep = () => {
    props.setSplitIndex(nextSplitIndex(/\s+/, props));
    scroll();
  };

  const bigStep = () => {
    // Newline or phrase punctuation followed by whitespace
    const pattern = /\n|[.,:;?!”’»)-]\s+/;
    props.setSplitIndex(nextSplitIndex(pattern, props));
    scroll();
  };

  const stepToEnd = () => {
    props.setSplitIndex(props.verseText.length);
    scroll();
  };

  const reviewFailed = () => {
    const verse = props.verse;
    props.updateVerse(verse, Verse.failedReviewParams(verse));
    props.nextVerse();
  };

  const reviewSuccess = () => {
    const verse = props.verse;
    props.updateVerse(verse, Verse.successfulReviewParams(verse));
    props.nextVerse();
  };

  return (
    <View style={styles.showWordsGame}>
      <ScrollView
        ref={ref => (this.scrollView = ref)}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.gameText}>{gameText(props)}</Text>
      </ScrollView>
      <ButtonRow
        review={true}
        done={props.splitIndex == props.verseText.length}
        normalStep={normalStep}
        bigStep={bigStep}
        stepToEnd={stepToEnd}
        reviewFailed={reviewFailed}
        reviewSuccess={reviewSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  showWordsGame: {
    flex: 1,
    backgroundColor: isIOS ? "white" : undefined
  },
  gameText: {
    flex: 1,
    fontSize: 24,
    padding: 8,
    backgroundColor: "white",
    margin: isIOS ? 0 : 8,
    elevation: isIOS ? 0 : 4
  }
});

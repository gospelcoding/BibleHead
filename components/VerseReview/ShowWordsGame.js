import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ButtonRow from "../VersePractice/ButtonRow";
import Verse from "../../models/Verse";

function gameText(props) {
  return props.verse.text.slice(0, props.splitIndex);
}

function remainderText(props) {
  return props.verse.text.slice(props.splitIndex);
}

function nextSplitIndex(pattern, props) {
  const match = pattern.exec(remainderText(props));
  return match === null
    ? props.verse.text.length
    : match[0].length + match.index + props.splitIndex;
}

export default function showWordsGame(props) {
  const normalStep = () => {
    props.setSplitIndex(nextSplitIndex(/\s+/, props));
  };

  const bigStep = () => {
    // Newline or phrase punctuation followed by whitespace
    const pattern = /\n|[.,;-]\s+/;
    props.setSplitIndex(nextSplitIndex(pattern, props));
  };

  const stepToEnd = () => {
    props.setSplitIndex(props.verse.text.length);
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
      <Text style={styles.gameText}>{gameText(props)}</Text>
      <ButtonRow
        review={true}
        done={props.splitIndex == props.verse.text.length}
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
    flex: 1
  },
  gameText: {
    flex: 1
  }
});

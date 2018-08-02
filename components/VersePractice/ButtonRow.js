import React from "react";
import { StyleSheet } from "react-native";
import ButtonRowHideWords from "./ButtonRowHideWords";
import ButtonRowFinal from "./ButtonRowFinal";
import ButtonRowShowWords from "../VerseReview/ButtonRowShowWords";
import ButtonRowReviewFinal from "../VerseReview/ButtonRowReviewFinal";

export default function ButtonRow(props) {
  if (props.review && props.done) {
    return <ButtonRowReviewFinal style={styles.buttonRow} {...props} />;
  }
  if (props.review) {
    return <ButtonRowShowWords style={styles.buttonRow} {...props} />;
  }
  if (props.done) {
    return <ButtonRowFinal style={styles.buttonRow} {...props} />;
  }
  if (props.game == "HideWords") {
    return <ButtonRowHideWords style={styles.buttonRow} {...props} />;
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

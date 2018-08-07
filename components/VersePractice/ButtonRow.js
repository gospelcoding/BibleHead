import React from "react";
import { StyleSheet } from "react-native";
import ButtonRowHideWords from "./ButtonRowHideWords";
import ButtonRowFinal from "./ButtonRowFinal";
import ButtonRowShowWords from "../VerseReview/ButtonRowShowWords";
import ButtonRowReviewFinal from "../VerseReview/ButtonRowReviewFinal";

export default function ButtonRow(props) {
  if (props.review && props.done) {
    return (
      <ButtonRowReviewFinal
        style={styles.buttonRow}
        buttonContainerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        iconButtonTextStyle={styles.iconButtonText}
        {...props}
      />
    );
  }
  if (props.review) {
    return (
      <ButtonRowShowWords
        style={styles.buttonRow}
        buttonContainerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        iconButtonTextStyle={styles.iconButtonText}
        {...props}
      />
    );
  }
  if (props.done) {
    return (
      <ButtonRowFinal
        style={styles.buttonRow}
        buttonContainerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        iconButtonTextStyle={styles.iconButtonText}
        {...props}
      />
    );
  }
  if (props.game == "HideWords") {
    return (
      <ButtonRowHideWords
        style={styles.buttonRow}
        buttonContainerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        iconButtonTextStyle={styles.iconButtonText}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row"
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    height: 65,
    margin: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 36
  },
  iconButtonText: {}
});

import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";

export default function LearnedToggleButton(props) {
  const markLearned = !props.verse.learned;
  const buttonTitle = markLearned ? "Mark Learned" : "Mark Unlearned";
  return (
    <Button
      onPress={() => {
        props.updateVerse(props.verse, { learned: markLearned });
        props.toggleSelect(props.verse);
      }}
      title={buttonTitle}
    />
  );
}

LearnedToggleButton.propTypes = {
  verse: PropTypes.shape({ learned: PropTypes.bool.isRequired }).isRequired,
  updateVerse: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired
};

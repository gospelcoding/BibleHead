import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";

export default function LearnedToggleButton(props) {
  const markLearned = !props.verse.learned;
  const buttonTitle = markLearned
    ? I18n.t("MarkLearned")
    : I18n.t("MarkUnlearned");
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

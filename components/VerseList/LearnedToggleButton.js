import React from "react";
import { Button } from "react-native";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";
import BHButton from "../shared/BHButton";

export default function LearnedToggleButton(props) {
  const markLearned = !props.verse.learned;
  const buttonTitle = markLearned
    ? I18n.t("MarkLearned")
    : I18n.t("MarkUnlearned");
  const color = markLearned ? ThemeColors.green : ThemeColors.red;
  return (
    <BHButton
      onPress={() => {
        props.updateVerse(props.verse, { learned: markLearned });
        props.toggleSelect(props.verse);
      }}
      title={buttonTitle}
      color={color}
    />
  );
}

LearnedToggleButton.propTypes = {
  verse: PropTypes.shape({ learned: PropTypes.bool }).isRequired,
  updateVerse: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired
};

import React from "react";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";
import BHButton from "../shared/BHButton";

export default function MarkUnlearnedButton(props) {
  return (
    <BHButton
      onPress={() => {
        props.updateVerse(props.verse, { learned: false });
        props.toggleSelect(props.verse);
      }}
      title={I18n.t("MarkUnlearned")}
      color={ThemeColors.red}
    />
  );
}

MarkUnlearnedButton.propTypes = {
  verse: PropTypes.shape({ learned: PropTypes.bool }).isRequired,
  updateVerse: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired
};

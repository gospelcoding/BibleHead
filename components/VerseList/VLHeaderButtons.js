import React from "react";
import PropTypes from "prop-types";
import { BHHeaderButtons, Item } from "../shared/BHHeaderButtons";
import { Platform } from "react-native";
import I18n from "../../i18n/i18n";

const isIos = Platform.OS == "ios";

export default function VLHeaderButtons(props) {
  return (
    <BHHeaderButtons>
      <Item title="add" iconName={`add`} onPress={props.addVerse} />
      <Item
        title={I18n.t("Preferences")}
        iconName={`settings`}
        show={isIos ? "always" : "never"}
        onPress={props.goToSettings}
      />
    </BHHeaderButtons>
  );
}

VLHeaderButtons.propTypes = {
  addVerse: PropTypes.func.isRequired,
  goToSettings: PropTypes.func.isRequired
};

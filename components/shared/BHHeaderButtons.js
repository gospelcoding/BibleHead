import React from "react";
import PropTypes from "prop-types";
import HeaderButtons, { HeaderButton } from "react-navigation-header-buttons";
import XPlatformIcon from "./XPlatformIcon";
import I18n from "../../i18n/i18n";

const BHHeaderButton = props => (
  <HeaderButton
    IconComponent={XPlatformIcon}
    iconSize={23}
    color="white"
    {...props}
  />
);

export const BHHeaderButtons = props => (
  <HeaderButtons
    HeaderButtonComponent={BHHeaderButton}
    OverflowIcon={
      <XPlatformIcon name={props.overflowIconName || "more"} color="white" />
    }
    cancelButtonText={I18n.t("Cancel")}
    {...props}
  />
);

BHHeaderButtons.propTypes = {
  overflowIconName: PropTypes.string
};

export const Item = HeaderButtons.Item;

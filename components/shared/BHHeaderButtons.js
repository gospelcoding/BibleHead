import React from "react";
import HeaderButtons, { HeaderButton } from "react-navigation-header-buttons";
import XPlatformIcon from "./XPlatformIcon";

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
    OverflowIcon={<XPlatformIcon name="more" color="white" />}
    {...props}
  />
);

export const Item = HeaderButtons.Item;

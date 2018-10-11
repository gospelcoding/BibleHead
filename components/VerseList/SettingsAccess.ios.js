import React from "react";
import PropTypes from "prop-types";
import BHActionButton from "../shared/BHActionButton";

export default function SettingsAccess(props) {
  return <BHActionButton onPress={props.goToSettings} name="settings" />;
}

SettingsAccess.propTypes = {
  goToSettings: PropTypes.func.isRequired
};

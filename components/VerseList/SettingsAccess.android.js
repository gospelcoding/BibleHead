import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import BHModalDropdown from "../shared/BHModalDropdown";
import I18n from "../../i18n/i18n";
import XPlatformIcon from "../shared/XPlatformIcon";

export default function SettingsAccess(props) {
  return (
    <BHModalDropdown
      style={{ margin: 8 }}
      dropdownStyle={{ elevation: 8 }}
      options={["Preferences"]}
      renderRow={option => (
        <Text style={styles.menuOption}>{I18n.t(option)}</Text>
      )}
      onSelect={props.goToSettings}
    >
      <XPlatformIcon name="more" color="white" />
    </BHModalDropdown>
  );
}

SettingsAccess.propTypes = {
  goToSettings: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  menuOption: {
    fontSize: 18,
    padding: 8
  }
});

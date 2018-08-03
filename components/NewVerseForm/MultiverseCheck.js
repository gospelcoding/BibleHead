import React from "react";
import PropTypes from "prop-types";
import { Text, Switch, View } from "react-native";
import I18n from "../../i18n/i18n";

export default function MultiverseCheck(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Switch value={false} onValueChange={props.setMultiverse} />
      <Text>{I18n.t("MoreThanOneVerse")}</Text>
    </View>
  );
}

MultiverseCheck.propTypes = {
  setMultiverse: PropTypes.func.isRequired
};

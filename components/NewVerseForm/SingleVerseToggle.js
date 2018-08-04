import React from "react";
import PropTypes from "prop-types";
import { Text, Switch, View } from "react-native";
import I18n from "../../i18n/i18n";

export default function SingleVerseToggle(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Switch value={props.singleVerse} onValueChange={props.setSingleVerse} />
      <Text>{I18n.t("SingleVerse")}</Text>
    </View>
  );
}

SingleVerseToggle.propTypes = {
  singleVerse: PropTypes.bool.isRequired,
  setSingleVerse: PropTypes.func.isRequired
};

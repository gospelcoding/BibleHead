import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import I18n from "../../i18n/i18n";

export default function SectionHeader(props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
      {props.reviewButton && (
        <Button onPress={props.doReview} title={I18n.t("ReviewVerses")} />
      )}
    </View>
  );
}

import React from "react";
import { View, StyleSheet } from "react-native";

export default function DividingLine() {
  return <View style={styles.dividingLine} />;
}

const styles = StyleSheet.create({
  dividingLine: {
    marginHorizontal: 12,
    borderTopWidth: 2,
    borderTopColor: "#ddd"
  }
});

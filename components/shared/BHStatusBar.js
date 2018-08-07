import React from "react";
import { StatusBar, Platform } from "react-native";
import ThemeColors from "../../util/ThemeColors";

export default function BHStatusBar() {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={
        Platform.OS == "ios" ? ThemeColors.blue : ThemeColors.darkBlue
      }
    />
  );
}

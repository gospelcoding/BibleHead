import React from "react";
import { SafeAreaView, Text, Flatlist } from "react-native";
import I18n from "../../i18n/i18n";
import { createStackNavigator } from "react-navigation";
import LanguageList from "./LanguageList";

const DownloadStack = createStackNavigator(
  {
    Language: LanguageList
  },
  {
    initialRouteName: "Language",
    headerMode: "none"
  }
);

export default class VerseDownload extends React.PureComponent {
  render() {
    return <DownloadStack />;
  }
}

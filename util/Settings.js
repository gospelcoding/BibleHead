import { AsyncStorage } from "react-native";

const settingsKey = "bh.settings";
const defaultSettings = {
  notification: true,
  notificationTime: "6:45",
  newVerseMethod: "AlwaysAsk"
};

export default class Settings {
  static async readSettings() {
    const settingsJSON = await AsyncStorage.getItem(settingsKey);
    if (!settingsJSON) {
      this.writeSettings(defaultSettings);
      return defaultSettings;
    }
    return JSON.parse(settingsJSON);
  }

  static async writeSettings(settings) {
    const settingsJSON = JSON.stringify(settings);
    await AsyncStorage.mergeItem(settingsKey, settingsJSON);
  }

  static newVerseMethodSettings() {
    return ["AlwaysAsk", "DownloadFromBibleGateway", "ManualEntry"];
  }
}

import { AsyncStorage } from "react-native";

const settingsKey = "bh.settings";

export default class Settings {
  static async writeDefaultSettings() {
    const defaults = {
      notification: true,
      notificationTime: "6:45",
      newVerseMethod: "AlwaysAsk"
    };
    Settings.writeSettings(defaults);
  }

  static async readSettings() {
    const settingsJSON = await AsyncStorage.getItem(settingsKey);
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

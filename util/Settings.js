import AsyncStorage from "@react-native-community/async-storage";

const settingsKey = "bh.settings";
const defaultSettings = {
  notification: true,
  notificationTime: "6:45",
  newVerseMethod: "AlwaysAsk",
  automaticBackup: false
};

export default {
  readSettings: readSettings,
  writeSettings: writeSettings,
  newVerseMethodSettings: newVerseMethodSettings
};

async function readSettings() {
  const settingsJSON = await AsyncStorage.getItem(settingsKey);
  if (!settingsJSON) {
    writeSettings(defaultSettings);
    return defaultSettings;
  }
  return JSON.parse(settingsJSON);
}

async function writeSettings(settings) {
  const settingsJSON = JSON.stringify(settings);
  await AsyncStorage.mergeItem(settingsKey, settingsJSON);
}

function newVerseMethodSettings() {
  return ["AlwaysAsk", "DownloadFromBibleGateway", "ManualEntry"];
}

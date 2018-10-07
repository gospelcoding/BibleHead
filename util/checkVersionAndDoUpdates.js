import { AsyncStorage, NativeModules, Platform } from "react-native";
import VerseStorage from "../models/VerseStorage";
import BibleBook from "../models/BibleBook";
import I18n from "../i18n/i18n";

const currentVersion = "2.6";
const storageKey = "bh.version";
const AlarmModule = NativeModules.AlarmModule;
const VerseStorageConverterModule = NativeModules.VerseStorageConverterModule;
const isIOS = Platform.OS == "ios";

export default async function checkVersionAndDoUpdates() {
  const lastVersion = await AsyncStorage.getItem(storageKey);
  switch (lastVersion) {
    case null:
      if (isIOS) await addFirstVerse();
      else await androidFirstRun();
  }

  // Always
  AlarmModule.setAlarmTime(
    "6:45",
    I18n.t("NotificationTitle"),
    I18n.t("NotificationText")
  );
  AsyncStorage.setItem(storageKey, currentVersion);
  return 0;
}

async function androidFirstRun() {
  AlarmModule.setupNotificationChannel(
    I18n.t("NotificationChannelDescription")
  );
  const existingVersesJSON = await VerseStorageConverterModule.importExistingVerses();
  const existingVerses = JSON.parse(existingVersesJSON);
  if (existingVerses.length > 0) {
    for (let verse of existingVerses) await VerseStorage.createVerse(verse);
  } else {
    await addFirstVerse();
  }
}

async function addFirstVerse() {
  await VerseStorage.createVerse({
    bookId: 57,
    bookName: BibleBook.books()[57],
    startChapter: 4,
    startVerse: 12,
    text: I18n.t("Heb412")
  });
}

import { AsyncStorage, NativeModules, Platform } from "react-native";
import VerseStorage from "../models/VerseStorage";
import BibleBook from "../models/BibleBook";
import I18n from "../i18n/i18n";
import Notifications from "./Notifications";

const currentVersion = "2.8";
const storageKey = "bh.version";
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
  await Notifications.updateNotificationSchedule();
  AsyncStorage.setItem(storageKey, currentVersion);
  return 0;
}

async function androidFirstRun() {
  Notifications.setupNotificationChannel();
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

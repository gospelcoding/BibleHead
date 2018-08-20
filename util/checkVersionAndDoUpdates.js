import { AsyncStorage } from "react-native";
import VerseStorage from "../models/VerseStorage";
import BibleBook from "../models/BibleBook";
import I18n from "../i18n/i18n";

const currentVersion = "2.0";
const storageKey = "bh.version";

export default async function checkVersionAndDoUpdates() {
  const lastVersion = await AsyncStorage.getItem(storageKey);
  switch (lastVersion) {
    case null:
      await addFirstVerse();
      break;
  }
  await AsyncStorage.setItem(storageKey, currentVersion);
  return 0;
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

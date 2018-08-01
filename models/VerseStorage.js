import { AsyncStorage } from "react-native";
import Verse from "./Verse";
import update from "immutability-helper";

export default class VerseStorage {
  static async createVerse(verse) {
    await createVerse(verse);
  }

  static async getAllVerses() {
    return await getAllVerses();
  }

  static async getVerseText(verse) {
    return await getVerseText(verse);
  }

  static async updateVerse(verse, mergeVerse) {
    return await updateVerse(verse, mergeVerse);
  }
}

async function getAllVerses() {
  const vindex = await getVerseIndex();
  const verseDataKeys = vindex.map(id => {
    return `bh.verseData.${id}`;
  });
  const keyDataPairs = await AsyncStorage.multiGet(verseDataKeys);
  return keyDataPairs.map(pair => {
    return JSON.parse(pair[1]);
  });
}

async function getVerseText(verse) {
  return await AsyncStorage.getItem(`bh.verseText.${verse.id}`);
}

async function createVerse(verse) {
  await assignVerseId(verse);
  const { text, ...verseData } = verse;
  await Promise.all([
    AsyncStorage.setItem(
      `bh.verseData.${verseData.id}`,
      JSON.stringify(verseData)
    ),
    AsyncStorage.setItem(`bh.verseText.${verseData.id}`, text),
    updateVerseIndex(verse)
  ]);
}

async function assignVerseId(verse) {
  verse.id = await takeNextVerseId();
}

async function takeNextVerseId() {
  const id = await nextVerseId();
  await AsyncStorage.setItem("bh.nextVerseId", `${id + 1}`);
  return id;
}

async function nextVerseId() {
  const idStr = await AsyncStorage.getItem("bh.nextVerseId");
  return parseInt(idStr) || 1;
}

async function updateVerseIndex(verse) {
  let vindex = await getVerseIndex();
  const versesData = await getAllVerses();
  let position = versesData.findIndex(compareVerse => {
    return Verse.compare(verse, compareVerse) < 0;
  });
  if (position == -1) position = vindex.length;
  vindex.splice(position, 0, verse.id);
  await AsyncStorage.setItem("bh.verseIndex", JSON.stringify(vindex));
}

async function getVerseIndex() {
  const vIndexJson = await AsyncStorage.getItem("bh.verseIndex");
  return vIndexJson ? JSON.parse(vIndexJson) : [];
}

// We might have to update the index!
async function updateVerse(verse, mergeVerse) {
  const newVerse = update(verse, { $merge: mergeVerse });
  const { text, ...verseData } = newVerse;
  AsyncStorage.setItem(
    `bh.verseData.${verseData.id}`,
    JSON.stringify(verseData)
  );
  if (text) AsyncStorage.setItem(`bh.verseText.${verseData.id}`, text);
}

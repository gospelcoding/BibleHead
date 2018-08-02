import { AsyncStorage } from "react-native";
import Verse from "./Verse";
import update from "immutability-helper";

export default class VerseStorage {
  static async createVerse(verse) {
    return await createVerse(verse);
  }

  static async getAllVerses() {
    return await getAllVerses();
  }

  static async updateVerse(verse, mergeVerse) {
    return await updateVerse(verse, mergeVerse);
  }
}

async function createVerse(verse) {
  verse = await assignVerseId(verse);
  verse.createdAt = new Date().getTime();
  await Promise.all([
    AsyncStorage.setItem(`bh.verse.${verse.id}`, JSON.stringify(verse)),
    addVerseToIndex(verse)
  ]);
  return verse;
}

async function assignVerseId(verse) {
  const id = await takeNextVerseId();
  return update(verse, { $merge: { id: id } });
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

async function getAllVerses() {
  const vindex = await getVerseIndex();
  const verseKeys = vindex.map(id => {
    return `bh.verse.${id}`;
  });
  const keyDataPairs = await AsyncStorage.multiGet(verseKeys);
  return keyDataPairs.map(pair => {
    return JSON.parse(pair[1]);
  });
}

async function addVerseToIndex(verse) {
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
  AsyncStorage.setItem(`bh.verse.${newVerse.id}`, JSON.stringify(newVerse));
}

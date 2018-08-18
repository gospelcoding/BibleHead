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

  static async deleteVerse(id) {
    return await deleteVerse(id);
  }
}

async function createVerse(verse) {
  verse = await assignVerseId(verse);
  verse.createdAt = new Date().getTime();
  await Promise.all([
    AsyncStorage.setItem(`bh.verse.${verse.id}`, JSON.stringify(verse)),
    addVerseToIndexAndSave(verse)
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

async function getAllVerses(index) {
  index = index ? index : await getVerseIndex();
  const verseKeys = index.map(id => {
    return `bh.verse.${id}`;
  });
  const keyDataPairs = await AsyncStorage.multiGet(verseKeys);
  return keyDataPairs.map(pair => {
    return JSON.parse(pair[1]);
  });
}

async function addVerseToIndex(index, verse) {
  const versesData = await getAllVerses(index);
  let position = versesData.findIndex(compareVerse => {
    return Verse.compare(verse, compareVerse) < 0;
  });
  if (position == -1) position = index.length;
  index.splice(position, 0, verse.id);
  return index;
}

async function addVerseToIndexAndSave(verse) {
  const newIndex = await addVerseToIndex(await getVerseIndex(), verse);
  await saveVerseIndex(newIndex);
}

async function saveVerseIndex(index) {
  await AsyncStorage.setItem("bh.verseIndex", JSON.stringify(index));
}

async function getVerseIndex() {
  const vIndexJson = await AsyncStorage.getItem("bh.verseIndex");
  return vIndexJson ? JSON.parse(vIndexJson) : [];
}

async function updateVerse(verse, mergeVerse) {
  const newVerse = update(verse, { $merge: mergeVerse });
  AsyncStorage.setItem(`bh.verse.${newVerse.id}`, JSON.stringify(newVerse));
  if (needToMoveVerseInIndex(mergeVerse)) await moveVerseInIndex(newVerse);
}

function needToMoveVerseInIndex(mergeVerse) {
  return mergeVerse.bookId || mergeVerse.startChapter || mergeVerse.startVerse;
}

async function moveVerseInIndex(verse) {
  let index = await getVerseIndex();
  index = removeVerseFromIndex(index, verse.id);
  index = await addVerseToIndex(index, verse);
  await saveVerseIndex(index);
}

async function deleteVerse(id) {
  const verse = await AsyncStorage.getItem(`bh.verse.${id}`);
  await AsyncStorage.setItem(`bh.deletedVerse.${id}`, verse);
  let deletedVerses = await AsyncStorage.getItem(`bh.deletedVerses`);
  deletedVerses = deletedVerses ? JSON.parse(deletedVerses) : [];
  deletedVerses.push(id);
  await AsyncStorage.setItem("bh.deletedVerses", JSON.stringify(deletedVerses));
  await removeVerseFromIndexAndSave(id);
}

function removeVerseFromIndex(index, id) {
  const removeAt = index.indexOf(id);
  if (removeAt >= 0) index.splice(removeAt, 1);
  return index;
}

async function removeVerseFromIndexAndSave(id) {
  const newIndex = removeVerseFromIndex(await getVerseIndex(), id);
  await saveVerseIndex(newIndex);
}

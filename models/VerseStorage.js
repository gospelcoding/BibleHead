import { AsyncStorage } from "react-native";

export default class VerseStorage {
  static async createVerse(verse) {
    await createVerse(verse);
  }

  // TODO - this should not be public because it exposes implementation details
  static async getVerseIndex() {
    return await getVerseIndex();
  }
}

async function createVerse(verse) {
  await assignVerseId(verse);
  const { id, text, ...verseData } = verse;
  await AsyncStorage.setItem(`bh.verseData.${id}`, JSON.stringify(verseData));
  await AsyncStorage.setItem(`bh.verseText.${id}`, text);
  await updateVerseIndex(verse);
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
  // TODO - actually sort the index!
  vindex.push(verse.id);
  await AsyncStorage.setItem("bh.verseIndex", JSON.stringify(vindex));
}

async function getVerseIndex() {
  const vIndexJson = await AsyncStorage.getItem("bh.verseIndex");
  return vIndexJson ? JSON.parse(vIndexJson) : [];
}

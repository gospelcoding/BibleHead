import VerseStorage from "../models/VerseStorage";
import Axios from "axios";
import apiKeys from "./apiKeys";
import { AsyncStorage } from "react-native";
import Settings from "./Settings";

const formatVersion = 1;
const latestBackupStorageKey = "bh.backups.latest";
const minAutoBackupInterval = 2; // hours

// MOCK POST
// Axios.post = async (url, data) => {
//   console.warn(`POST ${url}\n\n${JSON.stringify(data)}`);
//   return { data: { code: "mock" } };
// };

export default {
  createBackup: createBackup,
  automaticBackup: automaticBackup,
  restoreBackup: restoreBackup,
  latestBackupData: latestBackupData
};

async function createBackup() {
  const verses = await VerseStorage.getAllVerses();
  const backupCode = await getBackupCode();
  const data = {
    verses: verses,
    code: backupCode,
    formatVersion: formatVersion,
    apiKey: apiKeys.bh
  };
  try {
    const response = await Axios.post(
      "https://bh-api.gospelcoding.org/api/verses",
      data
    );
    const responseBackupCode = response.data.code;
    return saveBackupData(responseBackupCode);
  } catch (error) {
    throw "NetworkError";
  }
}

async function automaticBackup() {
  const settings = await Settings.readSettings();
  if (!settings.automaticBackup) return;

  const prevBackupData = await latestBackupData();
  if (prevBackupData && notOldEnough(prevBackupData)) return;

  createBackup();
}

function notOldEnough(prevBackupData) {
  const now = Date.now().valueOf();
  const then = new Date(prevBackupData.datetime).valueOf();
  return now - then < minAutoBackupInterval * 60 * 60 * 1000;
}

async function restoreBackup(code) {
  try {
    const response = await Axios.get(
      `https://bh-api.gospelcoding.org/api/verses/${code}`
    );
    return response.data.verses;
  } catch (error) {
    if (error.response && error.response.status == 404) throw "NoSuchBackup";
    else throw "NetworkError";
  }
}

async function latestBackupData() {
  const backupDataStr = await AsyncStorage.getItem(latestBackupStorageKey);
  return backupDataStr ? JSON.parse(backupDataStr) : null;
}

async function getBackupCode() {
  const lastBackup = await latestBackupData();
  return lastBackup ? lastBackup.code : undefined;
}

function saveBackupData(code) {
  const backupData = {
    code: code,
    datetime: new Date().getTime()
  };
  AsyncStorage.setItem(latestBackupStorageKey, JSON.stringify(backupData));
  return backupData;
}

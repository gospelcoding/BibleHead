import VerseStorage from "../models/VerseStorage";
import Axios from "axios";
import apiKeys from "./apiKeys";
import { AsyncStorage } from "react-native";

const formatVersion = 1;
const latestBackupStorageKey = "bh.backups.latest";

export default class Backup {
  static async createBackup() {
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
      if (response.status != 200) throw "NetworkError";
      const responseBackupCode = response.data.code;
      return saveBackupData(responseBackupCode);
    } catch (error) {
      throw "NetworkError";
    }
  }

  static async latestBackupData() {
    const backupDataStr = await AsyncStorage.getItem(latestBackupStorageKey);
    return backupDataStr ? JSON.parse(backupDataStr) : null;
  }
}

async function getBackupCode() {
  const lastBackup = await Backup.latestBackupData();
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

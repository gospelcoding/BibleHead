import Axios from 'axios';
import apiKeys from './apiKeys';
import {Verse} from '../verses/Verse';
import {TKey} from '../i18n/i18n';
import {BHSettings} from '../settings/Settings';

const formatVersion = 1;
const latestBackupStorageKey = 'bh.backups.latest';
const minAutoBackupInterval = 2; // hours

export type LatestBackup = {
  code: string;
  datetime: number;
};

// MOCK POST
// Axios.post = async (url, data) => {
//   console.warn(`POST ${url}\n\n${JSON.stringify(data)}`);
//   return { data: { code: "mock" } };
// };

export async function createBackup(
  verses: Verse[],
  code: string | undefined,
): Promise<LatestBackup> {
  const data = {
    verses,
    code,
    formatVersion: formatVersion,
    apiKey: apiKeys.bh,
  };
  try {
    const response = await Axios.post(
      'https://bh-api.gospelcoding.org/api/verses',
      data,
    );
    return {
      code: response.data.code,
      datetime: new Date().getTime(),
    };
  } catch (error) {
    const err: TKey = 'NetworkError';
    throw err;
  }
}

export async function automaticBackup(verses: Verse[], settings: BHSettings) {
  if (!settings.automaticBackup) return;

  const prevBackupData = settings.latestBackup;
  if (prevBackupData && notOldEnough(prevBackupData)) return;

  return createBackup(verses, prevBackupData?.code);
}

function notOldEnough(prevBackupData: LatestBackup) {
  const now = Date.now().valueOf();
  const then = new Date(prevBackupData.datetime).valueOf();
  return now - then < minAutoBackupInterval * 60 * 60 * 1000;
}

export async function restoreBackup(code: string) {
  try {
    const response = await Axios.get(
      `https://bh-api.gospelcoding.org/api/verses/${code}`,
    );
    return response.data.verses;
  } catch (error) {
    if (error.response && error.response.status == 404) throw 'NoSuchBackup';
    else throw 'NetworkError';
  }
}

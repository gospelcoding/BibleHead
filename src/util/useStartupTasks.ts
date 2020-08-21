import {useState, useEffect, useContext} from 'react';
import {AppDispatch, useAppSelector} from '../BHState';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Verse, newVerse} from '../verses/Verse';
import versesSlice from '../verseList/versesSlice';
import {I18nContext} from '../i18n/i18nReact';
import {Strings} from '../i18n/i18n';
import {settingsSlice} from '../settings/Settings';

export default function useStartupTasks() {
  const dispatch = useDispatch();
  const prevRunVersion = useAppSelector(
    (state) => state.settings.prevRunVersion,
  );
  const i18n = useContext(I18nContext);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    startupTasks(prevRunVersion, dispatch, i18n)
      .catch((err) => console.error(err))
      .finally(() => setReady(true));
  }, []);

  return {ready};
}

async function startupTasks(
  prevRunVersion: string | undefined,
  dispatch: AppDispatch,
  i18n: Strings,
) {
  if (prevRunVersion === undefined) {
    try {
      console.log('WELCOME TO BIBLEHEAD!');
      await firstRunRestoreVersesOrInitialize(dispatch, i18n);
      await firstRunRestoreSettings(dispatch);
    } catch (err) {
      console.error(err);
    }
  }

  dispatch(settingsSlice.actions.setPrevRunVersion());
}

async function firstRunRestoreVersesOrInitialize(
  dispatch: AppDispatch,
  i18n: Strings,
) {
  const legacyVerses = await legacyGetAllVerses();
  if (legacyVerses.length > 0) {
    dispatch(versesSlice.actions.add(legacyVerses));
  } else {
    dispatch(
      versesSlice.actions.add([
        newVerse({
          bookId: 57,
          bookName: i18n.bibleBooks[57],
          startChapter: 4,
          startVerse: 12,
          text: i18n.Heb412,
        }),
      ]),
    );
  }
}

async function legacyGetAllVerses(): Promise<Verse[]> {
  const vIndexJson = await AsyncStorage.getItem('bh.verseIndex');
  const index: number[] = vIndexJson ? JSON.parse(vIndexJson) : [];
  const verseKeys = index.map((id) => {
    return `bh.verse.${id}`;
  });
  const keyDataPairs = await AsyncStorage.multiGet(verseKeys);
  return keyDataPairs
    .map((pair) => {
      return pair[1] && JSON.parse(pair[1]);
    })
    .filter((verse) => verse);
}

async function firstRunRestoreSettings(dispatch: AppDispatch) {
  // Restore legacy settings if any
  try {
    const legacyKeyPairs = await AsyncStorage.multiGet([
      'bh.settings',
      'bh.backups.latest',
      'bh.passageSplitter.helpTextSeen',
    ]);
    legacyKeyPairs
      .filter((keyPair) => keyPair[1])
      .forEach((keyPair) => {
        switch (keyPair[0]) {
          case 'bh.settings':
            const {
              notification,
              notificationTime,
              automaticBackup,
            } = JSON.parse(keyPair[1]!);
            dispatch(settingsSlice.actions.toggleNotifications(!!notification));
            dispatch(
              settingsSlice.actions.setNotificationTime(notificationTime),
            );
            if (automaticBackup)
              dispatch(settingsSlice.actions.toggleAutomaticBackups());
            break;
          case 'bh.backups.latest':
            dispatch(
              settingsSlice.actions.setLatestBackup(JSON.parse(keyPair[1]!)),
            );
            break;
          case 'bh.passageSplitter.helpTextSeen':
            dispatch(
              settingsSlice.actions.setPassageSplitterHelpTextSeen(true),
            );
            break;
        }
      });
  } catch (err) {
    console.error(err);
  }
}

// import { NativeModules, Platform } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
// import VerseStorage from "../models/VerseStorage";
// import BibleBook from "../models/BibleBook";
// import I18n from "../i18n/i18n";
// import Notifications from "./Notifications";

// const currentVersion = "2.16";
// const storageKey = "bh.version";
// // const VerseStorageConverterModule = NativeModules.VerseStorageConverterModule;
// const isIOS = Platform.OS == "ios";

// export default async function checkVersionAndDoUpdates() {
//   const lastVersion = await AsyncStorage.getItem(storageKey);
//   switch (lastVersion) {
//     case null:
//        await addFirstVerse();
//   }

//   // Always
//   // await Notifications.updateNotificationSchedule();
//   AsyncStorage.setItem(storageKey, currentVersion);
//   return 0;
// }

// // async function androidFirstRun() {
// //   const existingVersesJSON = await VerseStorageConverterModule.importExistingVerses();
// //   const existingVerses = JSON.parse(existingVersesJSON);
// //   if (existingVerses.length > 0) {
// //     for (let verse of existingVerses) await VerseStorage.createVerse(verse);
// //   } else {
// //     await addFirstVerse();
// //   }
// // }

// async function addFirstVerse() {
//   await VerseStorage.createVerse({
//     bookId: 57,
//     bookName: BibleBook.books()[57],
//     startChapter: 4,
//     startVerse: 12,
//     text: I18n.t("Heb412")
//   });
// }

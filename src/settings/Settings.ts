import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LatestBackup} from '../util/Backups';

export type LearnGame = 'HideWords' | 'ShuffleWords';

export const CURRENT_VERSION = '3.3';

export interface BHSettings {
  notification: boolean;
  notificationTime: string;
  useBibleGateway: boolean;
  automaticBackup: boolean;
  learnGame: LearnGame;
  latestBackup?: LatestBackup;
  passageSplitterHelpTextSeen?: boolean;
  prevRunVersion?: string;
}

export function defaultSettings(): BHSettings {
  return {
    notification: true,
    notificationTime: '6:45',
    automaticBackup: false,
    useBibleGateway: true,
    learnGame: 'HideWords',
  };
}

export const settingsSlice = createSlice({
  name: 'Settings',
  initialState: defaultSettings(),
  reducers: {
    toggleNotifications: (state, action: PayloadAction<boolean>) => {
      state.notification = action.payload;
    },
    setNotificationTime: (state, action: PayloadAction<string>) => {
      state.notificationTime = action.payload;
    },
    toggleLearnGame: (state) => {
      state.learnGame =
        state.learnGame == 'HideWords' ? 'ShuffleWords' : 'HideWords';
    },
    toggleBibleGateway: (state) => {
      state.useBibleGateway = !state.useBibleGateway;
    },
    setLatestBackup: (state, action: PayloadAction<LatestBackup>) => {
      state.latestBackup = action.payload;
    },
    toggleAutomaticBackups: (state) => {
      state.automaticBackup = !state.automaticBackup;
    },
    setPassageSplitterHelpTextSeen: (state, action: PayloadAction<boolean>) => {
      state.passageSplitterHelpTextSeen = action.payload;
    },
    setPrevRunVersion: (state) => {
      state.prevRunVersion = CURRENT_VERSION;
    },
  },
});

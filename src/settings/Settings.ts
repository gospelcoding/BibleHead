import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LatestBackup} from '../util/Backups';

export type LearnGame = 'HideWords' | 'ShuffleWords' | 'FloatWords';

export const CURRENT_VERSION = '3.2';

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
    setLearnGame: (state, action: PayloadAction<LearnGame>) => {
      state.learnGame = action.payload;
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

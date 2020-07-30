import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type LearnGame = 'HideWords' | 'ShuffleWords';

export interface BHSettings {
  notification: boolean;
  notificationTime: string;
  useBibleGateway: boolean;
  automaticBackup: boolean;
  learnGame: LearnGame;
}

export function defaultSettings(): BHSettings {
  return {
    notification: true,
    notificationTime: '6:45',
    automaticBackup: false,
    useBibleGateway: false,
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
    toggleLearnGame: (state) => {
      state.learnGame =
        state.learnGame == 'HideWords' ? 'ShuffleWords' : 'HideWords';
    },
    toggleBibleGateway: (state) => {
      state.useBibleGateway = !state.useBibleGateway;
    },
  },
});

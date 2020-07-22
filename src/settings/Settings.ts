import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BHSettings {
  notification: boolean;
  notificationTime: string;
  newVerseMethod: NewVerseMethod;
  automaticBackup: boolean;
}
export const newVerseMethods = <const>[
  'AlwaysAsk',
  'DownloadFromBibleGateway',
  'ManualEntry',
];
export type NewVerseMethod = typeof newVerseMethods[number];

export function defaultSettings(): BHSettings {
  return {
    notification: true,
    notificationTime: '6:45',
    newVerseMethod: 'AlwaysAsk',
    automaticBackup: false,
  };
}

export const settingsSlice = createSlice({
  name: 'Settings',
  initialState: defaultSettings(),
  reducers: {
    toggleNotifications: (state, action: PayloadAction<boolean>) => {
      state.notification = action.payload;
    },
  },
});

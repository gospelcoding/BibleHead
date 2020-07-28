import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BHSettings {
  notification: boolean;
  notificationTime: string;
  useBibleGateway: boolean;
  automaticBackup: boolean;
  learnGame: 'HideWords' | 'ShuffleWords';
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
  },
});

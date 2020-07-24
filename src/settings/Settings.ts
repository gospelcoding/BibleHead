import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BHSettings {
  notification: boolean;
  notificationTime: string;
  useBibleGateway: boolean;
  automaticBackup: boolean;
}

export function defaultSettings(): BHSettings {
  return {
    notification: true,
    notificationTime: '6:45',
    automaticBackup: false,
    useBibleGateway: false,
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

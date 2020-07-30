import React from 'react';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {settingsSlice} from './settings/Settings';
import AsyncStorage from '@react-native-community/async-storage';
import {TypedUseSelectorHook, useSelector, Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PropsWithChildren} from 'react';
import versesSlice from './verseList/versesSlice';
import thunk from 'redux-thunk';

const reducer = persistReducer(
  {key: 'root4', storage: AsyncStorage},
  combineReducers({
    settings: settingsSlice.reducer,
    verses: versesSlice.reducer,
  }),
);
const store = configureStore({reducer, middleware: [thunk]});
const persistor = persistStore(store);

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default function BHState(props: PropsWithChildren<{}>) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}

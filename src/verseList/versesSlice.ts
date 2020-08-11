import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Verse,
  compareVerses,
  successfulReviewParams,
  failedReviewParams,
  toggleLearnedParams,
} from '../verses/Verse';
import {AppDispatch, AppState} from '../BHState';
import {automaticBackup} from '../util/Backups';
import {settingsSlice} from '../settings/Settings';

export type VersesState = {
  verses: Verse[];
  nextId: number;
};

const versesSlice = createSlice({
  name: 'verses',
  initialState: {
    verses: [],
    nextId: 1,
  } as VersesState,
  reducers: {
    add: (state, action: PayloadAction<Verse[]>) => add(state, action.payload),
    update: (state, action: PayloadAction<Verse>) =>
      update(state, action.payload),
    toggleLearned: (state, action: PayloadAction<number>) => {
      const verse = state.verses.find((v) => v.id == action.payload);
      if (verse) Object.assign(verse, toggleLearnedParams(verse));
    },
    remove: (state, action: PayloadAction<number>) => {
      state.verses = state.verses.filter((v) => v.id !== action.payload);
    },
    reviewDone: (
      state,
      action: PayloadAction<{id: number; success: boolean}>,
    ) => {
      // const verseId: number | undefined = state.learning.toReview[0];
      const verse = state.verses.find((v) => v.id == action.payload.id);
      if (verse) {
        const newVerse = {
          ...verse,
          ...(action.payload.success
            ? successfulReviewParams(verse)
            : failedReviewParams()),
        };
        update(state, newVerse);
      }
    },
  },
});

function add(state: VersesState, verses: Verse[]) {
  verses.forEach((verse) => {
    state.verses.push({...verse, id: state.nextId});
    ++state.nextId;
  });
  state.verses.sort(compareVerses);
}

function update(state: VersesState, verse: Verse) {
  const index = state.verses.findIndex((v) => v.id == verse.id);
  if (index >= 0) {
    state.verses[index] = verse;
    state.verses.sort(compareVerses);
  }
}

export function addVerses(verses: Verse[]) {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(versesSlice.actions.add(verses));
    autoBackup(dispatch, getState);
  };
}

export function updateVerse(verse: Verse) {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(versesSlice.actions.update(verse));
    autoBackup(dispatch, getState);
  };
}

export function toggleVerseLearned(id: number) {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(versesSlice.actions.toggleLearned(id));
    autoBackup(dispatch, getState);
  };
}

export function removeVerse(id: number) {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(versesSlice.actions.remove(id));
    autoBackup(dispatch, getState);
  };
}

export function verseReviewDone(id: number, success: boolean) {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(versesSlice.actions.reviewDone({id, success}));
    autoBackup(dispatch, getState);
  };
}

async function autoBackup(dispatch: AppDispatch, getState: () => AppState) {
  const state = getState();
  const latestBackup = await automaticBackup(
    state.verses.verses,
    state.settings,
  );
  if (latestBackup)
    dispatch(settingsSlice.actions.setLatestBackup(latestBackup));
}

export default versesSlice;

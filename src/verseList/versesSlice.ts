import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Verse,
  compareVerses,
  successfulReviewParams,
  failedReviewParams,
  toggleLearnedParams,
  toggleSectionLearnedParams,
} from '../verses/Verse';
import {AppDispatch, AppState} from '../BHState';
import {automaticBackup} from '../util/Backups';
import {settingsSlice} from '../settings/Settings';
import {Streak, isCurrent, extendStreak, streakLength} from '../util/Streak';

export type VersesState = {
  verses: Verse[];
  nextId: number;
  bestStreak?: Streak;
  currentStreak?: Streak;
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
    toggleSectionLearned: (
      state,
      action: PayloadAction<{id: number; learned: boolean}>,
    ) => {
      const verse = state.verses.find((v) => v.id == action.payload.id);
      if (verse)
        Object.assign(
          verse,
          toggleSectionLearnedParams(verse, action.payload.learned),
        );
    },
    remove: (state, action: PayloadAction<number>) => {
      state.verses = state.verses.filter((v) => v.id !== action.payload);
    },
    practiceDone: (state, action: PayloadAction<number>) => {
      const verse = state.verses.find((v) => v.id == action.payload);
      if (verse) verse.lastPracticed = Date.now();

      streakUpdate(state);
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

        streakUpdate(state);
      }
    },
    streakReset: (state) => {
      streakReset(state);
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

function streakReset(state: VersesState) {
  if (state.currentStreak && !isCurrent(state.currentStreak))
    state.currentStreak = undefined;
}

function streakUpdate(state: VersesState) {
  state.currentStreak = extendStreak(state.currentStreak);
  if (streakLength(state.currentStreak) > streakLength(state.bestStreak))
    state.bestStreak = state.currentStreak;
}

export function versesUpdateAction(action: PayloadAction<any>) {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    dispatch(action);
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

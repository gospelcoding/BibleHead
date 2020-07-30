import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Verse,
  compareVerses,
  successfulReviewParams,
  failedReviewParams,
  selectReviewVersesAndLearningVerse,
  toggleLearnedParams,
} from '../verses/Verse';

export type VersesState = {
  verses: Verse[];
  nextId: number;
  learning: {
    toReview: number[];
    toLearn: number[];
  };
};

const versesSlice = createSlice({
  name: 'verses',
  initialState: {
    verses: [],
    nextId: 1,
    learning: {
      toReview: [],
      toLearn: [],
    },
  } as VersesState,
  reducers: {
    add: (state, action: PayloadAction<Verse[]>) =>
      addVerses(state, action.payload),
    update: (state, action: PayloadAction<Verse>) =>
      updateVerse(state, action.payload),
    toggleLearned: (state, action: PayloadAction<number>) => {
      const verse = state.verses.find((v) => v.id == action.payload);
      if (verse) Object.assign(verse, toggleLearnedParams(verse));
    },
    remove: (state, action: PayloadAction<number>) => {
      state.verses = state.verses.filter((v) => v.id !== action.payload);
    },
    learnAVerse: (state, action: PayloadAction<Verse>) => {
      state.learning = {toLearn: [action.payload.id], toReview: []};
    },
    startReview: (state) => {
      const {reviewVerses, learningVerse} = selectReviewVersesAndLearningVerse(
        state.verses,
      );
      state.learning.toReview = reviewVerses.map((v) => v.id);
      state.learning.toLearn = learningVerse ? [learningVerse.id] : [];
    },
    // Payload indicates review success
    reviewDone: (state, action: PayloadAction<boolean>) => {
      const verseId: number | undefined = state.learning.toReview[0];
      const verse = state.verses.find((v) => v.id == verseId);
      if (verse) {
        const newVerse = {
          ...verse,
          ...(action.payload
            ? successfulReviewParams(verse)
            : failedReviewParams()),
        };
        updateVerse(state, newVerse);
      }

      state.learning.toReview.shift();
    },
    clearLearning: (state) => {
      state.learning = {
        toLearn: [],
        toReview: [],
      };
    },
  },
});

function addVerses(state: VersesState, verses: Verse[]) {
  verses.forEach((verse) => {
    state.verses.push({...verse, id: state.nextId});
    ++state.nextId;
  });
  state.verses.sort(compareVerses);
}

function updateVerse(state: VersesState, verse: Verse) {
  const index = state.verses.findIndex((v) => v.id == verse.id);
  if (index >= 0) {
    state.verses[index] = verse;
    state.verses.sort(compareVerses);
  }
}

export default versesSlice;
